'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { KeyRound, Lock, ScanSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolResult,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import {
  EXAMPLE_JWT,
  EXAMPLE_JWT_RS256,
  getClaimRows,
  getExpiryStatus,
  isHmacAlgorithm,
  isRsaAlgorithm,
  parseJwt,
  signJwt,
  verifyJwt,
  type JwtTab,
  type VerifyJwtResult,
} from '@/lib/jwt'
import { cn } from '@/lib/utils'

const SHARE_INITIAL = {
  tab: 'decode' as JwtTab,
  token: '',
  secret: '',
  publicKey: '',
  header: EXAMPLE_JWT.header as string,
  payload: EXAMPLE_JWT.payload as string,
}

const TABS: { id: JwtTab; label: string; icon: typeof ScanSearch }[] = [
  { id: 'decode', label: 'Decode', icon: ScanSearch },
  { id: 'verify', label: 'Verify', icon: Lock },
  { id: 'sign', label: 'Sign', icon: KeyRound },
]

interface JwtWorkbenchProps {
  defaultTab?: JwtTab
}

export function JwtWorkbench({ defaultTab = 'decode' }: JwtWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })
  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as JwtTab

  const [signedToken, setSignedToken] = useState('')
  const [signError, setSignError] = useState('')
  const [verifyResult, setVerifyResult] = useState<VerifyJwtResult | null>(null)
  const [verifying, setVerifying] = useState(false)

  const parsed = useMemo(() => {
    if (!state.token.trim()) return null
    const result = parseJwt(state.token)
    return 'error' in result ? result : result
  }, [state.token])

  const decodeError = parsed && 'error' in parsed ? parsed.error : ''
  const decoded = parsed && !('error' in parsed) ? parsed : null

  const expiry = useMemo(
    () => (decoded ? getExpiryStatus(decoded.payload) : null),
    [decoded],
  )

  const claimRows = useMemo(
    () => (decoded ? getClaimRows(decoded.payload) : []),
    [decoded],
  )

  const verifyAlg = decoded?.header.alg as string | undefined
  const needsHmacSecret = verifyAlg ? isHmacAlgorithm(verifyAlg) : null
  const needsRsaPublicKey = verifyAlg ? isRsaAlgorithm(verifyAlg) : null

  useEffect(() => {
    if (tab !== 'verify' || !state.token.trim()) {
      setVerifyResult(null)
      setVerifying(false)
      return
    }

    const parts = parseJwt(state.token)
    if ('error' in parts) {
      setVerifyResult({ valid: false, error: parts.error })
      setVerifying(false)
      return
    }

    const alg = parts.header.alg as string | undefined
    const hasHmacKey = Boolean(state.secret.trim())
    const hasRsaKey = Boolean(state.publicKey.trim())

    if (isHmacAlgorithm(alg) && !hasHmacKey) {
      setVerifyResult(null)
      setVerifying(false)
      return
    }
    if (isRsaAlgorithm(alg) && !hasRsaKey) {
      setVerifyResult(null)
      setVerifying(false)
      return
    }
    if (!isHmacAlgorithm(alg) && !isRsaAlgorithm(alg)) {
      setVerifyResult(null)
      setVerifying(false)
      return
    }

    let cancelled = false
    setVerifying(true)

    void verifyJwt(state.token, { secret: state.secret, publicKey: state.publicKey }).then((result) => {
      if (!cancelled) {
        setVerifyResult(result)
        setVerifying(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [tab, state.token, state.secret, state.publicKey])

  useEffect(() => {
    if (tab !== 'sign' || !state.header.trim() || !state.payload.trim() || !state.secret.trim()) {
      setSignedToken('')
      setSignError('')
      return
    }

    let cancelled = false

    try {
      const header = JSON.parse(state.header) as object
      const payload = JSON.parse(state.payload) as object

      void signJwt(header, payload, state.secret).then((result) => {
        if (cancelled) return
        if ('error' in result) {
          setSignedToken('')
          setSignError(result.error)
        } else {
          setSignedToken(result.token)
          setSignError('')
        }
      })
    } catch {
      setSignedToken('')
      setSignError('Invalid JSON in header or payload')
    }

    return () => {
      cancelled = true
    }
  }, [tab, state.header, state.payload, state.secret])

  const setTab = (next: JwtTab) => setField('tab', next)

  const clearAll = () => {
    setField('token', '')
    setField('secret', '')
    setField('publicKey', '')
    setField('header', SHARE_INITIAL.header)
    setField('payload', SHARE_INITIAL.payload)
    setSignedToken('')
    setSignError('')
    setVerifyResult(null)
  }

  const loadExample = () => {
    setField('token', EXAMPLE_JWT.token)
    setField('secret', EXAMPLE_JWT.secret)
    setField('publicKey', '')
    setField('header', EXAMPLE_JWT.header)
    setField('payload', EXAMPLE_JWT.payload)
  }

  const loadRs256Example = () => {
    setField('token', EXAMPLE_JWT_RS256.token)
    setField('secret', '')
    setField('publicKey', EXAMPLE_JWT_RS256.publicKey)
    setField('header', '{"alg":"RS256","typ":"JWT"}')
    setField('payload', EXAMPLE_JWT.payload)
  }

  const inspectSignedToken = () => {
    if (!signedToken) return
    setField('token', signedToken)
    setTab('decode')
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant={tab === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTab(id)}
          >
            <Icon className="size-3.5" />
            {label}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        JWT workbench — decode tokens, verify HMAC (HS256/384/512) or RSA (RS256/384/512) signatures,
        and sign test tokens. All processing runs in your browser.{' '}
        <Link href="/tools/jwt-decoder" className="text-primary underline-offset-4 hover:underline">
          Decoder
        </Link>
        {' · '}
        <Link href="/tools/jwt-generator" className="text-primary underline-offset-4 hover:underline">
          Generator
        </Link>
      </p>

      {tab === 'decode' && (
        <>
          <ToolPanel label="JWT token">
            <ToolTextarea
              value={state.token}
              onChange={(e) => setField('token', e.target.value)}
              placeholder="Paste your JWT here (eyJhbGciOiJ…)…"
              className="min-h-28"
            />
          </ToolPanel>

          {decodeError && <ToolError message={decodeError} />}

          {decoded && (
            <>
              {expiry && (
                <ToolResult
                  variant={
                    expiry.status === 'active'
                      ? 'success'
                      : expiry.status === 'no-expiry'
                        ? 'warning'
                        : 'error'
                  }
                  title={
                    expiry.status === 'active'
                      ? 'Token is valid'
                      : expiry.status === 'expired'
                        ? 'Token is expired'
                        : expiry.status === 'not-yet-valid'
                          ? 'Token not yet valid'
                          : 'No expiry set'
                  }
                >
                  {expiry.message}
                </ToolResult>
              )}

              <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                <p className="text-sm font-medium">Algorithm & type</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {String(decoded.header.alg ?? 'unknown')} · {String(decoded.header.typ ?? 'JWT')}
                </p>
              </div>

              {claimRows.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-border/70">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/70 bg-muted/30 text-left">
                        <th className="px-4 py-2 font-medium">Claim</th>
                        <th className="px-4 py-2 font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {claimRows.map(({ key, value, standard }) => (
                        <tr key={key} className="border-b border-border/50 last:border-0">
                          <td className="px-4 py-2 font-mono text-xs">
                            {key}
                            {!standard && (
                              <span className="ml-2 text-muted-foreground">(custom)</span>
                            )}
                          </td>
                          <td className="px-4 py-2 break-all font-mono text-xs">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="grid gap-4 lg:grid-cols-2">
                <ToolPanel label="Header">
                  <ToolTextarea
                    value={JSON.stringify(decoded.header, null, 2)}
                    readOnly
                    className="min-h-32"
                  />
                </ToolPanel>
                <ToolPanel label="Payload">
                  <ToolTextarea
                    value={JSON.stringify(decoded.payload, null, 2)}
                    readOnly
                    className="min-h-48"
                  />
                </ToolPanel>
              </div>
            </>
          )}

          <ToolActions>
            {decoded && (
              <>
                <ToolCopyButton
                  text={JSON.stringify(decoded.header, null, 2)}
                  label="Copy header"
                />
                <ToolCopyButton
                  text={JSON.stringify(decoded.payload, null, 2)}
                  label="Copy payload"
                />
              </>
            )}
            <ToolClearButton onClear={() => setField('token', '')} />
            <Button type="button" variant="outline" onClick={loadExample}>
              Load example
            </Button>
            {decoded && (
              <Button type="button" variant="outline" size="sm" onClick={() => setTab('verify')}>
                Verify signature →
              </Button>
            )}
          </ToolActions>
        </>
      )}

      {tab === 'verify' && (
        <>
          <ToolPanel label="JWT token">
            <ToolTextarea
              value={state.token}
              onChange={(e) => setField('token', e.target.value)}
              placeholder="Paste the JWT to verify…"
              className="min-h-24"
            />
          </ToolPanel>

          {decoded && verifyAlg && (
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
              <p className="text-sm font-medium">Detected algorithm</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {verifyAlg}
                {needsHmacSecret && ' — paste the HMAC secret below'}
                {needsRsaPublicKey && ' — paste the PEM public key below'}
                {!needsHmacSecret && !needsRsaPublicKey && ' — signing key type not supported for verify'}
              </p>
            </div>
          )}

          {(needsHmacSecret === true || needsHmacSecret === null) && (
            <ToolPanel label="HMAC secret (HS256/384/512)">
              <ToolTextarea
                value={state.secret}
                onChange={(e) => setField('secret', e.target.value)}
                placeholder="HMAC secret used to sign the token"
                className="min-h-20"
                mono={false}
              />
            </ToolPanel>
          )}

          {(needsRsaPublicKey === true || needsRsaPublicKey === null) && (
            <ToolPanel label="Public key PEM (RS256/384/512)">
              <ToolTextarea
                value={state.publicKey}
                onChange={(e) => setField('publicKey', e.target.value)}
                placeholder={'-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----'}
                className="min-h-32"
              />
            </ToolPanel>
          )}

          {verifying && (
            <p className="text-sm text-muted-foreground">Verifying signature…</p>
          )}

          {!verifying && verifyResult && !verifyResult.error && (
            <ToolResult
              variant={verifyResult.valid ? 'success' : 'error'}
              title={verifyResult.valid ? 'Signature valid' : 'Signature invalid'}
            >
              {verifyResult.valid
                ? isRsaAlgorithm(verifyResult.alg)
                  ? `The token was signed with ${verifyResult.alg} and the public key matches.`
                  : `The token was signed with ${verifyResult.alg} and the secret matches.`
                : `The token claims ${verifyResult.alg ?? 'unknown'}, but the signature does not match the provided key.`}
            </ToolResult>
          )}

          {!verifying && verifyResult?.error && (
            <ToolError message={verifyResult.error} />
          )}

          {decoded && verifyResult?.valid && expiry && (
            <ToolResult
              variant={
                expiry.status === 'active'
                  ? 'success'
                  : expiry.status === 'no-expiry'
                    ? 'warning'
                    : 'error'
              }
              title="Expiry check"
            >
              {expiry.message}
            </ToolResult>
          )}

          {decoded && verifyResult?.valid && (
            <div className="grid gap-4 lg:grid-cols-2">
              <ToolPanel label="Decoded header">
                <ToolTextarea
                  value={JSON.stringify(decoded.header, null, 2)}
                  readOnly
                  className="min-h-28"
                />
              </ToolPanel>
              <ToolPanel label="Decoded payload">
                <ToolTextarea
                  value={JSON.stringify(decoded.payload, null, 2)}
                  readOnly
                  className="min-h-28"
                />
              </ToolPanel>
            </div>
          )}

          <ToolActions>
            <ToolClearButton
              onClear={() => {
                setField('token', '')
                setField('secret', '')
                setField('publicKey', '')
              }}
            />
            <Button type="button" variant="outline" onClick={loadExample}>
              HS256 example
            </Button>
            <Button type="button" variant="outline" onClick={loadRs256Example}>
              RS256 example
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setTab('decode')}>
              ← Inspect claims
            </Button>
          </ToolActions>
        </>
      )}

      {tab === 'sign' && (
        <>
          <ToolPanel label="Header (JSON)">
            <ToolTextarea
              value={state.header}
              onChange={(e) => setField('header', e.target.value)}
              className="min-h-20"
            />
          </ToolPanel>

          <ToolPanel label="Payload (JSON)">
            <ToolTextarea
              value={state.payload}
              onChange={(e) => setField('payload', e.target.value)}
              className="min-h-32"
            />
          </ToolPanel>

          <ToolPanel label="Secret key">
            <ToolTextarea
              value={state.secret}
              onChange={(e) => setField('secret', e.target.value)}
              placeholder="HMAC secret for signing"
              className="min-h-20"
              mono={false}
            />
          </ToolPanel>

          {signError && <ToolError message={signError} />}

          {signedToken && (
            <ToolPanel label="Signed JWT">
              <ToolTextarea value={signedToken} readOnly className="min-h-24" />
            </ToolPanel>
          )}

          <ToolActions>
            <ToolCopyButton text={signedToken} label="Copy token" disabled={!signedToken} />
            <ToolClearButton
              onClear={() => {
                setField('header', SHARE_INITIAL.header)
                setField('payload', SHARE_INITIAL.payload)
                setField('secret', '')
                setSignedToken('')
                setSignError('')
              }}
            />
            <Button type="button" variant="outline" onClick={loadExample}>
              Load example
            </Button>
            {signedToken && (
              <Button type="button" variant="outline" size="sm" onClick={inspectSignedToken}>
                Inspect in Decode →
              </Button>
            )}
          </ToolActions>
        </>
      )}

      <ToolExample title="Examples">
        <p className="font-medium">HS256</p>
        <p className="font-mono break-all">{EXAMPLE_JWT.token}</p>
        <p className="mt-2">
          Secret: <code className="rounded bg-muted px-1">{EXAMPLE_JWT.secret}</code>
        </p>
        <p className="mt-4 font-medium">RS256</p>
        <p className="font-mono break-all text-xs">{EXAMPLE_JWT_RS256.token.slice(0, 80)}…</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Use &quot;RS256 example&quot; on the Verify tab to load the token and matching public key.
        </p>
      </ToolExample>

      <p className={cn('text-xs text-muted-foreground')}>
        ES256 (ECDSA) verification is not yet supported. Signing remains HMAC-only — use Verify for
        HS256/384/512 (secret) or RS256/384/512 (PEM public key). Never paste production secrets into
        untrusted tools.
      </p>
    </div>
  )
}

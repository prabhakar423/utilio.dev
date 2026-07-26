import { dump, load } from 'js-yaml'

export type YamlTab = 'yaml-to-json' | 'json-to-yaml'

export const YAML_EXAMPLE = {
  yaml: 'name: John\nage: 30\nskills:\n  - YAML\n  - JSON',
  json: '{"name":"John","age":30,"skills":["YAML","JSON"]}',
} as const

export function convertYamlToJson(input: string): { output: string; error: string } {
  if (!input.trim()) return { output: '', error: '' }
  try {
    return { output: JSON.stringify(load(input), null, 2), error: '' }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'Invalid YAML',
    }
  }
}

export function convertJsonToYaml(input: string): { output: string; error: string } {
  if (!input.trim()) return { output: '', error: '' }
  try {
    return {
      output: dump(JSON.parse(input), { indent: 2, lineWidth: -1 }),
      error: '',
    }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'Invalid JSON',
    }
  }
}

export function convertYaml(input: string, tab: YamlTab): { output: string; error: string } {
  return tab === 'yaml-to-json' ? convertYamlToJson(input) : convertJsonToYaml(input)
}

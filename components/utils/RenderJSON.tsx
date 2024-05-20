interface Props {
  json: any
}
export function RenderJSON({ json }: Props) {
  return <pre>{JSON.stringify(json, null, '\t')}</pre>
}

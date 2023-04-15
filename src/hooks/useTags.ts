import { useLocalStorageState } from './useLocalStorage'

export const useTags = () => {
  const [tags, setTags] = useLocalStorageState<string[]>('toolbox:tags', [])

  return { tags, setTags }
}

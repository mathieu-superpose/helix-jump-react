import { useEffect, useMemo } from "react"

type TKeys = { [key: string]: number | false }

function useTimedKeyPress() {
  const keys: TKeys = useMemo(() => {
    return {}
  }, [])

  useEffect(() => {
    function addKey(e: KeyboardEvent) {
      const key: string = e.key.toLowerCase()

      if (!keys[key]) {
        keys[key] = Date.now()
      }
    }

    window.addEventListener("keydown", addKey)

    function removeKey(e: KeyboardEvent) {
      const key: string = e.key.toLowerCase()
      keys[key] = false
    }

    window.addEventListener("keyup", removeKey)

    return () => {
      window.removeEventListener("keydown", addKey)
      window.removeEventListener("keyup", removeKey)
    }
  }, [])

  return { keys }
}

export default useTimedKeyPress

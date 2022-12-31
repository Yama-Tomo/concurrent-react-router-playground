import { useCallback, useTransition } from 'react'
import { useQuery } from 'react-query'

type GetIssuesResponse = {
  id: number
  title: string
  html_url: string
  user: {
    id: number
    login: string
    html_url: string
  }
}

export type GithubIssuesProps = { page: number, repoName: string, onPrevClick: () => void, onNextClick: () => void }
export const GithubIssues = (props: GithubIssuesProps) => {
  const [isPending, startTransition] = useTransition()
  const { page, onPrevClick, onNextClick } = props

  const nextPage = useCallback(() => {
    startTransition(onNextClick)
  }, [startTransition, onNextClick])

  const prevPage = useCallback(() => {
    startTransition(onPrevClick)
  }, [startTransition, onPrevClick])

  const { data: issues } = useQuery(
    [`${props.repoName}/issues`, page],
    () => {
      const url = `https://api.github.com/repos/${props.repoName}/issues?per_page=10&state=all&page=${page}`
      return fetch(url, {
        headers: { 'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
      }).then<GetIssuesResponse[]>((r) => r.json())
    },
    { staleTime: 60000 }
  )

  return (
    <div>
      <h2>{props.repoName} (page:{page})</h2>
      <hr />
      {issues?.length ? (
        <div>
          <div>
            <button onClick={prevPage} disabled={isPending || page == 1}>prev</button>
            <button onClick={nextPage} disabled={isPending}>next</button>
            <div style={{ height: '1.5rem' }}>{isPending && 'loading...'}</div>
          </div>
          <ul>
            {issues.map((issue) => (
              <li key={issue.id} style={{ textAlign: 'left' }}>
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <h3 style={{ marginBlockEnd: '0.3rem' }}><a target="_blank" href={issue.html_url}>{issue.title}</a></h3>
                <p style={{ marginBlockStart: 0, color: '#555' }}>opened by {issue.user.login}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : <>no issues</>}
    </div>
  )
}

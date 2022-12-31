import { GithubIssues, GithubIssuesProps } from '../components/GithubIssues'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback } from 'react'

const TypescriptIssues = () => {
  const params = useParams()
  const page = params.page ? Number(params.page) : 1
  const navigate = useNavigate()

  const issueProps: GithubIssuesProps = {
    page,
    repoName: 'microsoft/typescript',
    onPrevClick: useCallback(() => {
      navigate(`/issues/typescript/${page <= 1 ? 1 : page - 1}`)
    }, [navigate, page]),
    onNextClick: useCallback(() => {
      navigate(`/issues/typescript/${page + 1}`)
    }, [navigate, page]),
  }

  return <GithubIssues {...issueProps} />
}

export default TypescriptIssues

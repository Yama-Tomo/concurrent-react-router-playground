import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GithubIssues, GithubIssuesProps } from '../components/GithubIssues'

const ReactIssues = () => {
  const params = useParams()
  const page = params.page ? Number(params.page) : 1
  const navigate = useNavigate()

  const issueProps: GithubIssuesProps = {
    page,
    repoName: 'facebook/react',
    onPrevClick: useCallback(() => {
      navigate(`/issues/react/${page <= 1 ? 1 : page - 1}`)
    }, [navigate, page]),
    onNextClick: useCallback(() => {
      navigate(`/issues/react/${page + 1}`)
    }, [navigate, page]),
  }

  return <GithubIssues {...issueProps} />
}

export default ReactIssues

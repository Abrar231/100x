import Comment from './Comment'
import PropTypes from 'prop-types'

function CommentList({comments, setComments, setCommentsCount, setPopup}) {

  return (
    <section className='w-full'>
      {comments.map(comment => <Comment key={comment.id} comment={comment} comments={comments} setComments={setComments} setCommentsCount={setCommentsCount} setPopup={setPopup} />)}
    </section>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  setCommentsCount: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
}

export default CommentList
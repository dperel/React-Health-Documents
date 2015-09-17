
var Comment = React.createClass({
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          <a href={this.props.url}>{this.props.id}. {this.props.author}</a>
        </h2>
        <p> 
        Timestamp: {this.props.created_at}.  Document identical to these documents that are already in the system: {this.props.prior_matches}. 

        </p>
          <p>
            Description: {this.props.comment} 
          </p>
          <p>
          <a href={this.props.blockchainURL}>Find this record on the blockchain</a>
          </p>
      </div>
      );
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.comments.map(function (comment, index) {
      return (
        <Comment author={comment.author} comment={comment.comment} id={comment.id} url={"/comments/"+String(comment.id)} prior_matches={comment.prior_matches} blockchainURL={"www.blocktrail.com/"+comment.fingerprint} created_at={comment.created_at}key={index} />
        );
    });
    return (
      <div className="commentList">
        // insert filter function here?
        {commentNodes}
      </div>
      );
  }
});

var CommentBox = React.createClass({
  getInitialState: function () {
    return {comments: []};
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
  },
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (comments) {
        //this.handleChange
        this.setState({comments: comments});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.comments;
    var newComments = comments.concat([comment]);
    this.setState({comments: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {"comment": comment},
      success: function(data) {
        this.loadCommentsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Health Records for Patient</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
      );
  }
});


var CommentForm = React.createClass({
  handleSubmit: function() {
    var author = this.refs.author.getDOMNode().value.trim();
    var comment = this.refs.comment.getDOMNode().value.trim();
    var doc = this.refs.doc.getDOMNode().value.trim()
    this.props.onCommentSubmit({author: author, comment: comment, doc: doc});
    this.refs.author.getDOMNode().value = '';
    this.refs.comment.getDOMNode().value = '';
    this.refs.doc.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name of Laboratory" ref="author" />
        <input type="text" placeholder="Summary of this Document" ref="comment" />
         <input type="textarea" placeholder="Paste Entire Document Here" ref="doc" />
        <input type="submit" value="Post" />
      </form>
      );
  }
});


var ready = function () {
  React.render(
    <CommentBox url="/comments" />,
    document.getElementById('comments')
  );
};

$(document).ready(ready);
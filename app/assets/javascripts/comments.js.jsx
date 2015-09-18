var redStyle = {
  color: 'red'
}

var Comment = React.createClass({
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          <a href={this.props.url}>{this.props.author}</a>
        </h2>
        <p>
           {this.props.comment} 
        </p>
         <p>
        <strong style={redStyle}>Matches</strong>: Uploads with ID numbers {this.props.prior_matches} are identical to this. 
        </p>
        <table>
          <thead>
            <tr style={redStyle}>
              <th>Document ID</th>
              <th>Timestamp</th>
              <th>Blockchain Proof</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.id}</td>
              <td>{this.props.created_at}</td>
              <td> <a href={this.props.blockchainURL}>Link</a></td>
            </tr>
          </tbody>
        </table>

       <p>
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
        <h1>My Health Blockchain</h1>
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
        <h3>Submit a new record</h3>
        <p> 
        <input type="text" placeholder="Name of Laboratory" ref="author" />
        </p>
        <p>
        <input type="text" placeholder="Summary of Record" ref="comment" />
        </p>
        <p>
        <input type="textarea" placeholder="Paste Entire Document Here" ref="doc" />
        </p>
        <input type="submit" value="Add Record" />
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
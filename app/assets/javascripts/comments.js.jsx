//Comment class should be Record
//author attribute should be title. 
//This was my first time using React, and I built these components after reading several tutorials. One that used Comments was the first to actually render. 

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
        <Comment author={comment.author} comment={comment.comment} id={comment.id} url={"/comments/"+String(comment.id)} prior_matches={comment.prior_matches} blockchainURL={"https://blockexplorer.com/tx/46d45f75eca97b116846ef30e0502389bb43cae9d94665fc0684c6773d94133f"} created_at={comment.created_at}key={index} />
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
        <h2>Submit a new record</h2>
        
        <p> 
        Name of Laboratory: <input type="text" placeholder="Eg, 'Downtown Hospital Outpatient Group'" ref="author" />
        </p>
       
        <p>
         Summary of Record: <input type="text" placeholder="Eg, 'X-ray indicates minor swelling...'" ref="comment" />
        </p>
        <p>
         Paste Entire Document Here: <input type="textarea" placeholder="Paste CCDA File Text" ref="doc" />
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


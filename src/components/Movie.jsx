import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

function Movie(props) {
  var row = props.row;

  function handleEdit() {
    props.forEdit(row.id);
  }

  function showEditIcon() {
    return (
      <IconButton
        onClick={handleEdit}
        color="primary"
        aria-label="add an alarm"
      >
        <Tooltip title="Edit" placement="bottom" arrow>
          <EditIcon style={{ color: "blue" }} />
        </Tooltip>
      </IconButton>
    );
  }

  function dontShowEditIcon() {
    return (
      <img
        src="https://img.icons8.com/material-outlined/24/000000/no-edit.png"
        alt="s"
      />
    );
  }

  function showDeleteIcon() {
    return (
      <IconButton
        onClick={() => {
          props.forDel(props.index);
        }}
        color="secondary"
        aria-label="add an alarm"
      >
        <Tooltip title="Delete" placement="bottom" arrow>
          <DeleteIcon style={{ color: "red" }} />
        </Tooltip>
      </IconButton>
    );
  }

  function dontShowDeleteIcon() {
    return (
      <img
        src="https://img.icons8.com/material-outlined/24/000000/delete-forever.png"
        alt="sr"
      />
    );
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
      <TableCell>
        {props.editState ? showEditIcon() : dontShowEditIcon()}
      </TableCell>
      <TableCell>
        {props.editState ? showDeleteIcon() : dontShowDeleteIcon()}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.language}</TableCell>
      <TableCell>{row.budget}</TableCell>
      <TableCell>{row.rating}</TableCell>
    </TableRow>
  );
}

export default Movie;

import React from "react";
import EditMovie from "./EditMovie";
import Movie from "./Movie";

function MovieRowDisplay(props) {
  const row = props.row;
  if (row.id === props.isEditableId) {
    return (
      <EditMovie
        name={row.name}
        language={row.language}
        budget={row.budget}
        rating={row.rating}
        id={row.id}
        noDisplay={props.MakeEditInvisible}
        edit={props.MakeMovieEdit}
      />
    );
  } else {
    return (
      <Movie
        row={row}
        index={row.id}
        forEdit={props.handleEdit}
        forDel={props.handleDelete}
        editState={props.editState}
      />
    );
  }
}

export default MovieRowDisplay;

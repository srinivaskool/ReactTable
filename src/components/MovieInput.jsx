import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CancelIcon from "@material-ui/icons/Cancel";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import uuid from "uuid";
import IconButton from "@material-ui/core/IconButton";

function MovieInput(props) {
  const [movie, setMovie] = useState({
    id: uuid(),
    name: "",
    language: "",
    budget: "",
    rating: ""
  });

  function handleDone(event) {
    props.noDisplay();
    props.add(movie);
    setMovie({
      id: uuid(),
      name: "",
      language: "",
      budget: "",
      rating: ""
    });
  }

  function handleOnChange(event) {
    const { name, value } = event.target;
    setMovie(prevMovieData => {
      return {
        ...prevMovieData,
        [name]: value
      };
    });
  }

  function handleCross() {
    props.noDisplay();
  }

  return (
    <TableRow hover role="checkbox">
      <TableCell>
        <IconButton onClick={handleDone}>
          <Tooltip title="Done" placement="left">
            <DoneIcon style={{ color: "green" }} />
          </Tooltip>
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleCross} color="secondary">
          <Tooltip title="Cancel" placement="left" arrow>
            <CancelIcon style={{ color: "red" }} />
          </Tooltip>
        </IconButton>
      </TableCell>
      <TableCell>
        <TextField
          onChange={handleOnChange}
          name="name"
          id="name"
          label="Name"
          value={movie.name}
          required
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={handleOnChange}
          name="language"
          id="language"
          label="Language"
          value={movie.language}
          type="text"
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={handleOnChange}
          name="budget"
          id="budget"
          label="Budget"
          value={movie.budget}
          type="number"
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={handleOnChange}
          name="rating"
          id="rating"
          label="Rating"
          value={movie.rating}
          type="number"
        />
      </TableCell>
    </TableRow>
  );
}

export default MovieInput;

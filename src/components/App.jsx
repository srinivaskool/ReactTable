import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import headings from "../heading";
import TableHeader from "./TableHeader";
import Movie from "./Movie";
import MovieInput from "./MovieInput";
import EditMovie from "./EditMovie";
import DisplayMovieRow from "./DisplayMovieRow";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

function App() {
  const useStyles = makeStyles({
    root: {
      width: "100%"
    }
  });

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [visInput, setVisInput] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allMovies, setAllMovies] = useState([]);
  const [isEditableId, setIsEditableId] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [snackBarMovie, setsnackBarMovie] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [editState, setEditState] = useState(true);
  const [sortById, setSortById] = useState("name");
  const [sortingText, setSortingText] = useState(true);

  function SearchValues() {
    return allMovies
      .filter(
        movie =>
          movie.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          movie.language.toLowerCase().includes(searchValue.toLowerCase()) ||
          movie.budget
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          movie.rating
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
      .map((mov, i) => {
        return DisplayRowOfMovie(mov);
      });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function AddMovie(movie) {
    setsnackBarMovie(movie.name);
    setOpen(true);
    setAllMovies(prevMovies => {
      return [...prevMovies, movie];
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function MakeInputVisible() {
    setVisInput(true);
  }

  function MakeInputInvisible() {
    setVisInput(false);
  }

  function handleDelete(index) {
    setAllMovies(prevItems => {
      return allMovies.filter(item => {
        return item.id !== index;
      });
    });
  }

  function handleEdit(name) {
    setIsEditableId(name);
  }

  function MakeEditInvisible() {
    setIsEditableId("");
  }

  function DisplayRowOfMovie(row) {
    return (
      <DisplayMovieRow
        row={row}
        isEditableId={isEditableId}
        MakeEditInvisible={MakeEditInvisible}
        MakeMovieEdit={MakeMovieEdit}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editState={editState}
      />
    );
  }

  function MakeMovieEdit(edittedmovie) {
    allMovies.map(movie => {
      if (movie.id === edittedmovie.id) {
        movie.name = edittedmovie.name;
        movie.language = edittedmovie.language;
        movie.rating = edittedmovie.rating;
        movie.budget = edittedmovie.budget;
      }
      return null;
    });
  }

  function AscendingSort() {
    if (sortingText) {
      return allMovies
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort((a, b) =>
          a[sortById].toLowerCase() > b[sortById].toLowerCase() ? 1 : -1
        )
        .map(function(row) {
          return DisplayRowOfMovie(row);
        });
    } else {
      return allMovies
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort((a, b) => a[sortById] - b[sortById])
        .map(function(row) {
          return DisplayRowOfMovie(row);
        });
    }
  }

  function handleSort() {
    setIsAscending(!isAscending);
  }

  function DescendingSort() {
    if (sortingText) {
      return allMovies
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort((a, b) =>
          a[sortById].toLowerCase() < b[sortById].toLowerCase() ? 1 : -1
        )
        .map(function(row) {
          return DisplayRowOfMovie(row);
        });
    } else {
      return allMovies
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort((a, b) => b[sortById] - a[sortById])
        .map(function(row) {
          return DisplayRowOfMovie(row);
        });
    }
  }

  return (
    <div>
      <TableHeader
        addBtn={MakeInputVisible}
        searchBtn={SearchValues}
        val={setSearchValue}
        setEditState={setEditState}
        editState={editState}
      />
      <Paper className={classes.root}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headings.map(function(column) {
                  if (column.id === sortById) {
                    return (
                      <TableCell
                        onClick={() => {
                          setSortById(column.id);
                          column.type === "text"
                            ? setSortingText(true)
                            : setSortingText(false);
                        }}
                        key={column.id}
                        style={{ minWidth: column.minWidth, fontWeight: "600" }}
                      >
                        {isAscending ? (
                          <IconButton onClick={handleSort}>
                            <ArrowUpwardIcon
                              color="primary"
                              style={{ fontSize: 20 }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton onClick={handleSort}>
                            <ArrowDownwardIcon
                              color="primary"
                              style={{ fontSize: 20 }}
                            />
                          </IconButton>
                        )}
                        {column.label}
                      </TableCell>
                    );
                  } else {
                    return (
                      <Tooltip title="Click to Sort" placement="left">
                        <TableCell
                          key={column.id}
                          onClick={() => {
                            setSortById(column.id);
                          }}
                          style={{
                            minWidth: column.minWidth,
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          {column.label}
                        </TableCell>
                      </Tooltip>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {visInput ? (
                <MovieInput add={AddMovie} noDisplay={MakeInputInvisible} />
              ) : null}
              {searchValue === ""
                ? isAscending === true
                  ? AscendingSort()
                  : DescendingSort()
                : SearchValues()}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={allMovies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {snackBarMovie} Added Successfully !!!
        </Alert>
      </Snackbar>
    </div>
  );
}
export default App;

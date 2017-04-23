# check if `fswatch` is available
command -v fswatch >/dev/null 2>&1 || {
  echo "ERROR: fswatch command not found" >&2;
  echo "See https://github.com/emcrisostomo/fswatch for details" >&2;
  exit 1;
}

# check if the proper number of arguments was passed
if [ $# -ne 1 ]; then
  echo "Must pass one argument: path_to_watch." >&2;
  exit 1;
fi

if [ ! -f './run.js' ]; then
  echo 'Could not find run.js, a required node.js process.' >&2;
  exit 1;
fi

WATCH_PATH=`realpath $1`
echo "Now watching $WATCH_PATH"
fswatch -0 -xr $1 | xargs -0 -n 1 -I {} bash -c "node run.js $WATCH_PATH {}"

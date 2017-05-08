/*
  Arguments passed to this process are of the form:
    node run.js watched_directory changed_file event_flags

  Numeric event flags use the following codes:
       0  NoOp
       1  PlatformSpecific
       2  Created
       4  Updated
       8  Removed
      16  Renamed
      32  OwnerModified
      64  AttributeModified
     128  MovedFrom
     256  MovedTo
     512  IsFile
    1024  IsDir
    2048  IsSymLink
    4096  Link
    8192  Overflow

  They are combined using logical OR. For example, a newly created file would
  receive the code 514 = 512 & 2.

  This program will only monitor the following events:
    Created, Updated, Removed, Renamed, Moved From, MovedTo

  We will assume the following directory structure:
    LOCATION/
      location_grouping/
        DATE/
          unimportant/
            directory/
              groupings/
                file1
                file2
                ...
                fileN
  The most important pieces of information will be the LOCATION/ and DATE/
  directories, along with the file itself.
*/

// const path = 'MIAMI/Miami_calibrated/201502/'
const args = process.argv.slice(2)
const helpers = require('./helpers.js')
const C = require('./constants.js')

;(function run (root, full_path, flags) {
  // Remove the beginning of `full_path` to produce a relative path.
  let path = full_path.slice(root.length)

  /*
    For example, here is a possible `path`:
      Miami/Miami_1/201502/other/directory/info/file1.jpg

    The most important information here is 'Miami', '201502', and 'file1.jpg'.
    'Miami' is the name of the gallery located within the directory structure
    which is monitored on this computer; '201502' is the date of the gallery;
    `file.jpg` is the filename.

    We assume that the date is the first occurrence of numbers within the file
    path which is a directory name. For example, in
      Miami/Miami_1/201502/dir123/a1234/123456/file.jpg
    201502 is assumed to be the gallery date, so a regex should locate it. The
    other instances of numbers are not dates in date form or are not the first
    occurrence of date form; thus, they are ignored.
  */
  let date = helpers.getDateFromPath(path)

  // Terminate if a NoOp is passed.
  if (flags & C.NoOp) {
    return Promise.resolve()
  // Throw an error if fswatch experienced an overflow error.
  } else if (flags & C.Overflow) {
    return Promise.reject('Overflow error! Check standard error.')
  // No need to keep track of .DS_Store files.
  } else if (path.indexOf('.DS_Store') !== -1) {
    return Promise.resolve()
  }

  // Event fired for a directory. Recursively update files.
  if (flags & C.IsDir) {
    console.log('dir:', path, flags)
    return helpers.toggleChildren(root, full_path, run)
  } else {
    // If the created bit or removed bit is included, toggle the existence of
    // the file; this is necessary as both flags are included if a file is
    // created, removed, then re-created.
    // Furthermore, when a file is renamed, the event is fired twice -- for each
    // file name -- so remove the file the first time and create it again the
    // second time.
    console.log('file:', path, flags)
    if (flags & C.Created || flags & C.Removed || flags & C.Renamed) {
      return helpers.toggleFile(root, path, date)
    } else {
      return Promise.reject('Platform specific file change.')
    }
  }
})(...args.slice(0,2), parseInt(args[2]))
// Catch any potential errors.
.catch(err => console.log(err))
// Close the database connection, if one was made.
.then(() => helpers.DATABASE && helpers.DATABASE.close())

// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    paths: {
        knockout: 'lib/knockout-latest',
        jquery: 'lib/jquery.min',
        materialize: 'lib/materialize'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['main']);
strapkit_pebble
===============

StrapKit Pebble is the library that generates the Pebble code for a StrapKit-based project. StrapKit uses this library behind the scenes as part of the `strapkit create` command, but you can also use it ad-hoc to generate vanilla Pebble projects.

###Usage


    ./bin/create --no-metrics <path_to_new_project> <package_name> <project_name> [<project_template_dir>]
      --no-metrics (optional): Do not include StrapMetrics
        <path_to_new_project>: Path to your new StrapKit Pebble project
        <package_name>: Package name, following reverse-domain style convention
        <project_name>: Project name
        <project_template_dir>: Path to project template (override).

Licensed under Apache 2.0. Portions derived from the scripts included with Apache Cordova.
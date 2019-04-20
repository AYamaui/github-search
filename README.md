# GithubSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

This application allows to retrieve basic information about Github repositories. 

## Installation instructions:

* Clone the repository
```
git clone https://github.com/AYamaui/github-search.git
```

* Get into the directory
```
cd github-search
```

* Install angular Command Line Interface (CLI)
```
npm install -g @angular/cli
```

* Install the pacakges:
```
npm install
```

* Start a dev server. This command should automatically open a tab in the browser with the application, if that does not occur, navigate to `http://localhost:4200/`
```
ng serve --open
```

* Build the project
```
ng build
```

For production build use the `--prod` flag
```
ng build --prod
```

## Running unit tests

Type the following command in the console and a browser window with Karma will open to show all the tests
```
ng test
```


## Steps to use the application
In the main page there is an input where you can type a repository name. Clicking on the search icon or pressing the `Enter key` after typing the name, the basic information of the repository will be displayed.
If no repository matches the search criteria, a message will be displayed.

If the repository has issues, a link in the basic information box will be available to go to the separate Issues section, where a list of issues are displayed.
* Every issue box contains the title of the issue (with a link to the github URL).
* The status of the issue in shown in the left size with a green badge if it is open or an orange badge if it closed.
* Under the title is the last date the issue was updated.
* To the right it is the owner picture (with a link to his/her github profile).
* The issues are paginated with 10 items in each page.
* At the begining of the list there is a text that indicates how many issues are displayed out of the total issues in the repository.
* The issues are loaded in batch of 30, if more issues are required, at the last page there will be a button to load more issues.



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
In the main page there are three tabs: Basic Information, Issues, Statistics, but the latter two are disabled if no search has been done. In the basic info tab there is a text input where you can type a repository name. Clicking on the search icon or pressing the `Enter key` after typing the name, the basic information and the issues of the repository will be fetched, enabling the Issues and Statistics sections. If no repository matches the search criteria, a message will be displayed.

### Issues section
* Every issue box contains the title of the issue (with a link to the github URL).
* The status of the issue in shown in the left size with a green badge if it is open or an orange badge if it closed.
* Under the title is the last date the issue was updated.
* To the right it is the owner picture (with a link to his/her github profile).
* The issues are paginated with 10 items in each page.
* At the begining of the list there is a text that indicates how many issues are displayed out of the total issues in the repository.
* The issues are loaded in batch of 30, if more issues are required, at the last page there will be a button to load more issues.

### Statistics section
This section presents statistics over the issues displayed in the Issues section. If more issues are fetched the statistics will reload.

* The first chart shows, for a maximum of 18th months, the number of issues created per month
* The second chart shows, for a maximum of 18th months, the number of issues last updated per month
* The last chart shows the proportion of open and closed issues using a pie chart



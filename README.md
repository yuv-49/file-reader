NodeJS Project on reading file

# Steps to run:
1. clone this project
2. get into root directory
3. npm start (no need to do npm i, as there are no external packages used)
 -> Now visit localhost:8080 on your browser.


 # APIs
 1. GET /
    > Provides HTML on browser to display boilerplate UI.
    > Can be used to navigate to other api routes.
    Args: NA

2. GET /file
    Used to get all the file in stream
    Args: NA

3. GET /file-details
    Introduced to fetch various details on file
    ARGS:
        1. search: string
        2. sentenceCount: boolean
        3. occurance: boolean
        4. totalWordCount: boolean
        5. fileName: string

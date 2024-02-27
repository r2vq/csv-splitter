# Split CSV files

Actually, what this does is splits _any_ file.
It takes the top line of the file and assumes that it's a header.
Then it separates out the rest of the file by the limit size and makes a CSV file for each of those.
Then it applies the header of the original file to each of the new files.
Finally, it downloads the entire file as a zip file.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
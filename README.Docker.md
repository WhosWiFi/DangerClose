### Building and running your application

---------------------------------------------------

# Main Two Steps Needed

# Build
docker build . -t dangerclose:latest

# Run
docker run -it --rm -p 4123:4123 dangerclose:latest

----------------------------------------------------

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

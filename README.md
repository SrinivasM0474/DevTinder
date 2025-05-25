# DevTinder

- Create a vite + React application
- Remove unncessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar component to App.jsx

- Install axios
- CORS - install cors in backend ==> add middleware to app with configuration: origin, credentials: true
- Whenever you're making API call so pass axios => { withCredentials: true }

# Deployment

- Signup on AWS
- Launch Instance
- Create key pair
- Go to Downloads
- chmod 400 <secret>.pem --- DO this using gitbash
- ssh -i "devTinder-secret.pem" ubuntu@ec2-3-139-103-104.us-east-2.compute.amazonaws.com
- By using the above cmd we are logged into our machine
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
- nvm install v23.5.0(the latest version used in project)
- Installed node by using above cmd in ubuntu
- Git Clone repositories (FE and BE)

- ### Frontend

  - Go to the app folder

    ##### Do npm i

    - dependencies install

    - npm run build

    ##### Update Package List

    - sudo apt update

    ##### Insatll nginx

    - sudo install nginx / sudo apt install nginx

    ##### Start and Enable nginx

    - sudo systemctl start nginx
    - sudo systemctl enable nginx

    ##### Copy code from dist(build files) to nginx http server /var/www/html/

    - Copy code from dist(build files) to nginx http server /var/www/html/
    - sudo scp -r dist/\* /var/www/html (cmd to do that)

    - scp to copy -r means recursive dist/\* all files in dist to /var/www/html
    - copied all files from dist to /var/www/html

    - Enable port:80 of your instance from security -> security Groups -> Inbound rules

- ### Backend

  - allowed ec2 instance public IP on mongodb server
  - npm install pm2 -g
  - pm2 start npm -- start
  - pm2 logs (to check the logs)
  - pm2 flush <name> npm (npm is the name of the application)
  - pm2 list
  - pm2 stop <name> npm (name of the appication)
  - pm2 delete <name> npm (to delete the process)
  - pm2 start npm --name "<name>" -- start (eg: pm2 start npm --name "devtinder-backend -- start)
  - config nginx - sudo nano /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
    -Modify the BASEURl in fronend project to "/api"

  Frontend = http://3.142.199.132/
  Backend = http://3.142.199.132/4444

  Domain Name = devtinder.com => 3.142.199.132

  Frontend = devtinder.com
  Backend = devtinder.com:4444 => devtinder.com/api

- ### nginx proxy config:

- server_name 3.142.199.132;

- location / {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  }

# Adding a custom domain name

- purchased domain name from godaddy
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and poit to cloudflare
- wait for sometime till your name servers are updated

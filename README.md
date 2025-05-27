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
- chmod 400 <secret>.pem (chmod 400 "devTinder-secret.pem") --- DO this using gitbash
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

  - If any changes we can use git pull to pull latest changes

  - Afer making any changes again need to build and deploy

  - To open nginx config sudo nano /etc/nginx/sites-available/default

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
  - Modify the BASEURl in fronend project to "/api"
  - pm2 restart
  - **\***Afer added .env file in application, we need to create .env file manually in the production server
  - To create .env file in server user cmd sudo nano .env and copy paste the code in that and save

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

  location / {
  try_files $uri /index.html; //for nginx 404 not found issues, for SPAs
  }

- Afer making any changes again need to build and deploy

# Adding a custom domain name

- purchased domain name from godaddy
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and poit to cloudflare
- wait for sometime till your name servers are updated

# Sending Emails via SES

- Create IAM user
- Give Access to AmazonSESFullAccess
- Amazon SESl: Create an Identity
- Verify your domain name
- Verify your email address identity
- Install AWS SDK - v3
- Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- Setup SesClient
- Access Credentials should be created in IAM under SecurityCredentials Tab
- Write code for SESClient
- Write code for sending email address
- Make the email dynamic by passing more params to the run function

# Scheduling cron jobs in NodeJS

- Installing node-cron
- Learning about cron expressions syntax - crontab.guru
- Schedule a job
- date-fns (date management library)
- Find all unique email Id who have got connection Request in previous day
- Send Email
- Explore queue mechanism to send bulk emails
- Amazon SES Bulk Emails
- Make sendEmail function dynamic
- bee-queue & bull npm packages to handle queue mechanisms

# Razorpay Payment Gateway Integration

- Signup on Razorpay and complete KYC
- Created a UI for premium page
- Creating an API for create order on Backend
- installed razorpay in BE
- added my key and secret in env file
- Initialized Razorpay in utils
- Creating order on Razorpay
- Created Schema and model
- saved the order details in payments collection
- make the api dynamic
- Setup Razorpay webhook on your live API to get payment suucess/failure
- REF - https://github.com/razorpay/razorpay-node/tree/master/documents
- REF - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/
- REF - https://razorpay.com/docs/webhooks/validate-test/
- REF - https://razorpay.com/docs/webhooks/payloads/payments/

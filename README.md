# Raymond's Cloud Portfolio

My personal portfolio site, hosted entirely on AWS with a serverless visitor counter. I built it while studying for the **AWS Certified Cloud Practitioner** exam, so every service on here is one I actually set up by hand.

**Live site:** _coming soon_ (CloudFront URL goes here)

## Architecture

```
Browser ──► CloudFront ──► S3 (private bucket)        ← page files + resume
   │
   └──────► API Gateway ──► Lambda ──► DynamoDB        ← visitor counter
                              │
                              └──► CloudWatch logs + alarm
```

There are two separate paths. CloudFront serves the static files from a private S3 bucket. Then `script.js`, running in the visitor's browser, calls API Gateway, which triggers a Lambda function that adds 1 to the count in DynamoDB and sends back the new total.

## AWS services used

| Service | What it does here |
| --- | --- |
| **S3** | Stores the HTML, CSS, JS and resume (private, encrypted at rest) |
| **CloudFront** | CDN that caches the site at edge locations and serves it over HTTPS |
| **Origin Access Control** | Lets only CloudFront read the S3 bucket |
| **API Gateway** | HTTP API exposing `GET /count`, with CORS |
| **Lambda** | Python function that updates the visitor count |
| **DynamoDB** | Serverless NoSQL table that stores the count |
| **IAM** | Least-privilege role: Lambda can only run `UpdateItem` on one table |
| **CloudWatch + SNS** | Logs, metrics and an email alarm on Lambda errors |
| **CloudTrail** | Audit history of every change made in the account |
| **WAF / Shield** | Basic web-exploit and DDoS protection on CloudFront |
| **AWS Budgets** | Zero-spend alert so nothing costs money by surprise |

## Project structure

```
cloud-portfolio/
├── index.html   # Page content
├── style.css    # Styling
├── script.js    # Calls the API and shows the visitor count
└── resume.pdf   # My resume
```

## Run it locally

No build step, since it's plain HTML, CSS and JavaScript. Just open `index.html` in a browser. The counter shows "coming soon" until `API_URL` in `script.js` points at a deployed API.

## Deploy

1. Upload the files to an S3 bucket (Block Public Access on).
2. Create a CloudFront distribution with the bucket as the origin, using Origin Access Control and `index.html` as the default root object.
3. Create the DynamoDB table, the Lambda function and an HTTP API in API Gateway.
4. Paste the API's invoke URL into `script.js`, re-upload it, and invalidate the CloudFront cache (`/*`).

## What I learned

- How a CDN, edge locations and caching cut latency for visitors
- How a serverless app (API Gateway → Lambda → DynamoDB) fits together
- IAM roles, policies and least privilege in practice
- The difference between CloudWatch (performance) and CloudTrail (auditing)
- The shared responsibility model, and keeping a project at $0 with the Free Tier and Budgets

## Contact

**Raymond Quarshie**, Cybersecurity & Information Science @ University of Maryland
[r.rayquarshie@gmail.com](mailto:r.rayquarshie@gmail.com) · [github.com/rayq-codes](https://github.com/rayq-codes)

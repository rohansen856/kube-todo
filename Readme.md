# 📝 TODO App with Kubernetes, Docker, PostgreSQL & Terraform

A full-stack TODO application deployed with **Kubernetes**, containerized using **Docker**, backed by a **PostgreSQL** database, and optionally provisioned via **Terraform**.

---

## 📦 Tech Stack

- **Frontend/Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes (Minikube or any K8s cluster)
- **Infrastructure as Code**: Terraform (optional for cloud infra)

---

## 📁 Project Structure

```
todo-app/
├── app/                      # Express TODO app source code
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .gitignore
│   └── index.js / routes / db / etc.
├── k8s/                      # Kubernetes manifests
│   ├── app.yaml              # Deployment & Service for the app
│   └── postgres.yaml         # Deployment & Service for Postgres
├── terraform/                # Terraform scripts (optional)
│   └── main.tf
├── docker-compose.yml        # For local development
└── README.md
```

---

## 🚀 Getting Started

### Option 1: 🐳 Docker Compose (Local Dev)

```bash
# From project root
docker-compose up --build
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

### Option 2: ☸️ Kubernetes with Minikube

#### 🛠️ Prerequisites

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- Install [Docker](https://docs.docker.com/get-docker/)

#### 🚀 1. Start Minikube

```bash
minikube start
```

This starts a local Kubernetes cluster. You can check its status using:

```bash
minikube status
```

#### 📦 2. Deploy the App and Database

Apply the Kubernetes YAML files inside the `k8s/` directory:

```bash
kubectl apply -f k8s/
```

This will create:

- A **Deployment** and **NodePort Service** for the TODO app
- A **Deployment** and **ClusterIP Service** for PostgreSQL

#### ✅ 3. Confirm Everything is Running

```bash
kubectl get pods
kubectl get svc
```

You should see both `todo-app` and `postgres` running.

#### 🌐 4. Access the App

```bash
minikube service todo-app
```

This will open the browser (or show a URL like `http://192.168.49.2:30000`) where the app is running.

#### 🔍 5. Check Logs (Optional)

```bash
kubectl logs deployment/todo-app
```

```bash
kubectl logs deployment/postgres
```

Use this if you're debugging or verifying database connections.

---

### 🧹 Clean Up Kubernetes Resources

To remove the app and database from Minikube:

```bash
kubectl delete -f k8s/
```

To stop Minikube:

```bash
minikube stop
```

To delete Minikube cluster completely:

```bash
minikube delete
```

---

## 🗃️ PostgreSQL Setup (Kubernetes)

- Defined via `postgres.yaml`
- Uses environment variables for DB name, user, and password
- Uses a `ClusterIP` service for internal access by the app

To access manually:

```bash
kubectl exec -it deployment/postgres -- psql -U <username> -d <dbname>
```

Replace `<username>` and `<dbname>` with your config.

---

## 🌍 Terraform (Optional - Cloud Infra)

> Use this only if you're deploying on a cloud provider with Kubernetes clusters.

```bash
cd terraform/
terraform init
terraform apply
```

Configure backend, provider, and state as needed.

---

## 📄 Important Files

### `.dockerignore`

```
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
.env
*.md
```

### `.gitignore`

```
node_modules
.env
.DS_Store
.vscode/
.idea/
logs/
*.log
.terraform/
*.tfstate
*.tfvars
```

---

## 🧠 How It Works

1. The app is containerized using Docker.
2. PostgreSQL is deployed as a Kubernetes service.
3. Kubernetes Deployments manage pod creation and health.
4. Docker Compose allows quick local dev.
5. Terraform is provided to spin up cloud-based infrastructure.

---

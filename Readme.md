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
│   └── postgres.yaml         # StatefulSet & Service for Postgres
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

### Option 2: ☸️ Kubernetes (Minikube)

#### 1. Start Minikube

```bash
minikube start
```

#### 2. Apply Kubernetes Manifests

```bash
kubectl apply -f k8s/
```

#### 3. Access the App

```bash
minikube service todo-app
```

It will open the app in your browser or show a URL like `http://192.168.49.2:30000`

#### 4. Check Logs

```bash
kubectl logs deployment/todo-app
```

---

## 🗃️ PostgreSQL Setup (Kubernetes)

- Defined via `postgres.yaml`
- Uses a `PersistentVolumeClaim` for data storage
- Username/password/database defined via environment variables in the manifest

To access manually:

```bash
kubectl exec -it deployment/postgres -- psql -U <username> -d <dbname>
```

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

## 🧠 How It Works

1. The app is containerized using Docker.
2. A PostgreSQL service is used as the database.
3. Kubernetes manages the pods and services.
4. Docker Compose is available for quick local dev.
5. Terraform can be used to deploy cloud infra (optional).

---

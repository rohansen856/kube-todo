provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "todo" {
  metadata {
    name = "todo"
  }
}

resource "kubernetes_manifest" "todo_k8s" {
  manifest = yamldecode(file("${path.module}/../k8s/app.yaml"))
}

resource "kubernetes_manifest" "postgres_k8s" {
  manifest = yamldecode(file("${path.module}/../k8s/postgres.yaml"))
}

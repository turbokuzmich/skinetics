#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
release_dir="${project_dir}/release"
archive_path="${project_dir}/skinetics-release.tar.gz"

rm -rf -- "${release_dir}" "${archive_path}"

docker buildx build \
  --platform linux/amd64 \
  --file "${project_dir}/Dockerfile.build" \
  --target artifact \
  --output "type=local,dest=${release_dir}" \
  "${project_dir}"

test -f "${release_dir}/server.js"
test -d "${release_dir}/.next"
test -d "${release_dir}/node_modules"
test -d "${release_dir}/public"

tar -C "${release_dir}" -czf "${archive_path}" .

printf 'Created Linux/AMD64 release archive: %s\n' "${archive_path}"

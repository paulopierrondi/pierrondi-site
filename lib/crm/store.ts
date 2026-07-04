import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import type { CRMStore, Client, Project, Contract, Payment, Activity, Discussion } from './types'
import { SEED_DATA } from './seed'

function dataPath(): string {
  return process.env.CRM_DATA_PATH ?? path.join(process.cwd(), 'tmp', 'crm-data.json')
}

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

export function readStore(): CRMStore {
  const p = dataPath()
  if (!fs.existsSync(p)) return structuredClone(SEED_DATA)
  try {
    const raw = fs.readFileSync(p, 'utf-8')
    return JSON.parse(raw) as CRMStore
  } catch {
    return structuredClone(SEED_DATA)
  }
}

export function writeStore(store: CRMStore): void {
  const p = dataPath()
  ensureDir(p)
  fs.writeFileSync(p, JSON.stringify(store, null, 2), 'utf-8')
}

export function newId(): string {
  return crypto.randomUUID()
}

function now(): string {
  return new Date().toISOString()
}

export function getClients(): Client[] {
  return readStore().clients
}

export function getClient(id: string): Client | undefined {
  return readStore().clients.find((c) => c.id === id)
}

export function createClient(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client {
  const store = readStore()
  const client: Client = { ...data, id: newId(), createdAt: now(), updatedAt: now() }
  store.clients.push(client)
  writeStore(store)
  return client
}

export function updateClient(id: string, data: Partial<Omit<Client, 'id' | 'createdAt'>>): Client | null {
  const store = readStore()
  const idx = store.clients.findIndex((c) => c.id === id)
  if (idx === -1) return null
  store.clients[idx] = { ...store.clients[idx], ...data, updatedAt: now() }
  writeStore(store)
  return store.clients[idx]
}

export function deleteClient(id: string): boolean {
  const store = readStore()
  const before = store.clients.length
  store.clients = store.clients.filter((c) => c.id !== id)
  if (store.clients.length === before) return false
  writeStore(store)
  return true
}

export function getProjects(clientId?: string): Project[] {
  const store = readStore()
  return clientId ? store.projects.filter((p) => p.clientId === clientId) : store.projects
}

export function getProject(id: string): Project | undefined {
  return readStore().projects.find((p) => p.id === id)
}

export function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
  const store = readStore()
  const project: Project = { ...data, id: newId(), createdAt: now(), updatedAt: now() }
  store.projects.push(project)
  writeStore(store)
  return project
}

export function updateProject(id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | null {
  const store = readStore()
  const idx = store.projects.findIndex((p) => p.id === id)
  if (idx === -1) return null
  store.projects[idx] = { ...store.projects[idx], ...data, updatedAt: now() }
  writeStore(store)
  return store.projects[idx]
}

export function deleteProject(id: string): boolean {
  const store = readStore()
  const before = store.projects.length
  store.projects = store.projects.filter((p) => p.id !== id)
  if (store.projects.length === before) return false
  writeStore(store)
  return true
}

export function getContracts(projectId?: string): Contract[] {
  const store = readStore()
  return projectId ? store.contracts.filter((c) => c.projectId === projectId) : store.contracts
}

export function createContract(data: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>): Contract {
  const store = readStore()
  const contract: Contract = { ...data, id: newId(), createdAt: now(), updatedAt: now() }
  store.contracts.push(contract)
  writeStore(store)
  return contract
}

export function updateContract(id: string, data: Partial<Omit<Contract, 'id' | 'createdAt'>>): Contract | null {
  const store = readStore()
  const idx = store.contracts.findIndex((c) => c.id === id)
  if (idx === -1) return null
  store.contracts[idx] = { ...store.contracts[idx], ...data, updatedAt: now() }
  writeStore(store)
  return store.contracts[idx]
}

export function deleteContract(id: string): boolean {
  const store = readStore()
  const before = store.contracts.length
  store.contracts = store.contracts.filter((c) => c.id !== id)
  if (store.contracts.length === before) return false
  writeStore(store)
  return true
}

export function getPayments(projectId?: string): Payment[] {
  const store = readStore()
  return projectId ? store.payments.filter((p) => p.projectId === projectId) : store.payments
}

export function createPayment(data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Payment {
  const store = readStore()
  const payment: Payment = { ...data, id: newId(), createdAt: now(), updatedAt: now() }
  store.payments.push(payment)
  writeStore(store)
  return payment
}

export function updatePayment(id: string, data: Partial<Omit<Payment, 'id' | 'createdAt'>>): Payment | null {
  const store = readStore()
  const idx = store.payments.findIndex((p) => p.id === id)
  if (idx === -1) return null
  store.payments[idx] = { ...store.payments[idx], ...data, updatedAt: now() }
  writeStore(store)
  return store.payments[idx]
}

export function deletePayment(id: string): boolean {
  const store = readStore()
  const before = store.payments.length
  store.payments = store.payments.filter((p) => p.id !== id)
  if (store.payments.length === before) return false
  writeStore(store)
  return true
}

export function getActivities(projectId?: string): Activity[] {
  const store = readStore()
  return projectId ? store.activities.filter((a) => a.projectId === projectId) : store.activities
}

export function createActivity(data: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Activity {
  const store = readStore()
  const activity: Activity = { ...data, id: newId(), createdAt: now(), updatedAt: now() }
  store.activities.push(activity)
  writeStore(store)
  return activity
}

export function updateActivity(id: string, data: Partial<Omit<Activity, 'id' | 'createdAt'>>): Activity | null {
  const store = readStore()
  const idx = store.activities.findIndex((a) => a.id === id)
  if (idx === -1) return null
  store.activities[idx] = { ...store.activities[idx], ...data, updatedAt: now() }
  writeStore(store)
  return store.activities[idx]
}

export function deleteActivity(id: string): boolean {
  const store = readStore()
  const before = store.activities.length
  store.activities = store.activities.filter((a) => a.id !== id)
  if (store.activities.length === before) return false
  writeStore(store)
  return true
}

export function getDiscussions(projectId?: string): Discussion[] {
  const store = readStore()
  return projectId ? store.discussions.filter((d) => d.projectId === projectId) : store.discussions
}

export function createDiscussion(data: Omit<Discussion, 'id' | 'createdAt'>): Discussion {
  const store = readStore()
  const discussion: Discussion = { ...data, id: newId(), createdAt: now() }
  store.discussions.push(discussion)
  writeStore(store)
  return discussion
}

export function getDashboardStats() {
  const store = readStore()
  const totalReceived = store.payments
    .filter((p) => p.status === 'received')
    .reduce((sum, p) => sum + p.amount, 0)
  const pendingPayments = store.payments
    .filter((p) => p.status === 'pending' || p.status === 'partial')
    .reduce((sum, p) => sum + p.amount, 0)
  return {
    totalClients: store.clients.length,
    activeProjects: store.projects.filter((p) => p.status === 'active').length,
    totalReceived,
    pendingPayments,
    openActivities: store.activities.filter((a) => a.status !== 'done').length,
    completedProjects: store.projects.filter((p) => p.status === 'completed').length,
  }
}

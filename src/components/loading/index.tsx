"use client"
import "./loading.css";

export default function Loading() {
  return (
    <div data-testid="loading-component" className="loader-content">
      <div className="loader"></div>
    </div>
  )
}
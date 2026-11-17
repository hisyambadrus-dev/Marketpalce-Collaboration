# API Contract

Base URL: `http://localhost:4000/api`

## GET /health
Returns service status and server timestamp.

## GET /projects · GET /students
Returns the seeded marketplace projects and student directory.

## POST /projects/:projectId/proposals
Body: `applicantName`, `applicantAvatar`, `applicantMajor`, `applicantRep`, `appliedRole`, `pitch`, `portfolioUrl`; optional `offeredRate`, `deliveryDays`.

Returns the updated project with the new pending applicant.

## PATCH /projects/:projectId/proposals/:proposalId/accept
Accepts a pending applicant and changes the project status to `in_progress`.

## GET /workspace/:projectId/messages · POST /workspace/:projectId/messages
Create-message body: `sender`, `text`; optional `senderAvatar`, `attachment`.

## PATCH /workspace/:projectId/status
Body: `{ "status": "recruiting" | "in_progress" | "review" | "completed" }`.

This starter intentionally does not expose a real payment/escrow endpoint.

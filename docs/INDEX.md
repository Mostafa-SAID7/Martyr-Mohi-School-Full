# Documentation Index

## Quick Navigation

This document maps all markdown files and their purposes to ensure clarity and prevent duplication.

---

## Root Level

### Project-Level Documentation

| File | Purpose | Audience |
|------|---------|----------|
| **README.md** | Project overview, quick start, deployment | Everyone |
| **CONTRIBUTING.md** | How to contribute, commit format, guidelines | Contributors |
| **CODE_OF_CONDUCT.md** | Community standards and expectations | Community |

**Principle:** Brief, actionable. Links to detailed docs in `/docs/`.

---

## .github/ (GitHub Integration)

### Templates

| File | Purpose | When Used |
|------|---------|-----------|
| **pull_request_template.md** | PR submission format | When creating PRs |
| **ISSUE_TEMPLATE/bug_report.md** | Bug report template | When reporting bugs |
| **ISSUE_TEMPLATE/feature_request.md** | Feature request template | When requesting features |

**Principle:** Standardize issue/PR format for consistency.

---

## docs/ (Comprehensive Reference)

### Four Core Documentation Files

#### 1. ARCHITECTURE.md
**Purpose:** System design and technical overview  
**Covers:**
- Technology stack (React, TypeScript, Express, PostgreSQL)
- Frontend architecture (components, state, pages)
- Backend architecture (routes, services, middleware)
- Data flow (public/authenticated routes)
- Authentication flow
- Security considerations
- Scalability approach

**Audience:** Developers, architects, new team members  
**Length:** ~2000 words

#### 2. DATA_INTEGRITY.md
**Purpose:** Guidelines for verified vs unavailable vs demo data  
**Covers:**
- Verified information (school name, location, Plus Code)
- Unavailable information (phone, email, teacher names)
- Demo/sample data (courses, statistics, features)
- Implementation rules (DO/DON'T)
- Code examples
- Maintenance procedures
- FAQ

**Audience:** Content managers, developers, stakeholders  
**Length:** ~2000 words

#### 3. DEPLOYMENT.md
**Purpose:** How to deploy to production  
**Covers:**
- Frontend deployment (Vercel)
- Backend deployment (optional, Railway/Render)
- Database setup (Supabase)
- Domain configuration
- Production checklist
- Monitoring
- Rollback procedures
- Troubleshooting

**Audience:** DevOps, deployment engineers, maintainers  
**Length:** ~1800 words

#### 4. DEVELOPMENT.md
**Purpose:** Local development setup and workflow  
**Covers:**
- Prerequisites and installation
- Environment setup (.env)
- Running dev servers
- Development workflow (branching, commits, testing)
- File organization guidelines
- Testing approach
- Code style and conventions
- Git workflow
- Troubleshooting
- Resources

**Audience:** Developers, contributors  
**Length:** ~2000 words

---

## backend/README.md

**Purpose:** Backend-specific documentation  
**Covers:**
- Backend architecture overview
- Tech stack
- Quick start
- Scripts and commands
- API endpoints
- Database setup

**Principle:** Complements main README, not duplicating it.

**Relationship:** Links to docs/ARCHITECTURE.md and docs/DEVELOPMENT.md for deeper details.

---

## Verification Checklist ✅

### No Duplication
- ✅ README.md: Brief overview only, links to docs/
- ✅ CONTRIBUTING.md: Workflow only, links to DEVELOPMENT.md for details
- ✅ docs/DEVELOPMENT.md: Full setup guide (not in README)
- ✅ docs/ARCHITECTURE.md: System design (not scattered)
- ✅ docs/DEPLOYMENT.md: Only deployment info
- ✅ docs/DATA_INTEGRITY.md: Unique guidelines for data

### Clear Responsibility
- ✅ Root: Quick access, high-level
- ✅ .github: GitHub automation
- ✅ docs: Comprehensive reference
- ✅ backend/README.md: Backend-specific

### Information Flow
```
README.md (Overview)
├── Quick start → docs/DEVELOPMENT.md
├── Deployment → docs/DEPLOYMENT.md
├── Architecture → docs/ARCHITECTURE.md
├── Data → docs/DATA_INTEGRITY.md
└── Contributing → CONTRIBUTING.md → docs/DEVELOPMENT.md
```

---

## Adding New Documentation

### When to Create New Files

**DO create** if:
- Information is substantial (>500 words)
- Multiple files would reference it
- It's a separate concern/domain
- Example: API_REFERENCE.md if routes needed detail

**DON'T create** if:
- Can fit in existing file
- Duplicates information elsewhere
- Would create maintenance burden

### When to Update Existing Files

**Root files** (README, CONTRIBUTING, CODE_OF_CONDUCT)
- Only high-level changes
- Link to detailed docs in /docs/

**docs/ files**
- Domain-specific updates
- Keep separation of concerns

---

## File Statistics

| File | Lines | Last Updated | Responsibility |
|------|-------|--------------|-----------------|
| README.md | ~60 | Current | Mostafa |
| CONTRIBUTING.md | ~25 | Current | Mostafa |
| CODE_OF_CONDUCT.md | ~15 | Current | Mostafa |
| docs/ARCHITECTURE.md | ~250 | Current | Mostafa |
| docs/DATA_INTEGRITY.md | ~280 | Current | Mostafa |
| docs/DEPLOYMENT.md | ~300 | Current | Mostafa |
| docs/DEVELOPMENT.md | ~280 | Current | Mostafa |
| backend/README.md | ~80 | Current | Mostafa |
| .github/pull_request_template.md | ~15 | Current | Mostafa |
| .github/ISSUE_TEMPLATE/bug_report.md | ~20 | Current | Mostafa |
| .github/ISSUE_TEMPLATE/feature_request.md | ~15 | Current | Mostafa |

**Total:** ~1240 lines of documentation (no duplication)

---

## Maintenance Schedule

- **Monthly:** Verify links work, no broken references
- **Quarterly:** Review for outdated information
- **Per Release:** Update version numbers and dates
- **When Merging PR:** Update relevant documentation

---

## How to Use This Index

1. **Finding Information?** Use table above to locate relevant file
2. **Writing New Docs?** Check "Adding New Documentation" section
3. **Updating Docs?** Find file in relevant section, update with context
4. **Quality Check?** Review "Verification Checklist" to ensure no duplication

---

**Last Updated:** October 3, 2026  
**Status:** Complete & Production Ready ✅

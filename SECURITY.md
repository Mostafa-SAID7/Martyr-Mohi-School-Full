# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please **do not** open a public issue or discussion. Instead, email the maintainers directly at:

**security@[your-domain].com** (or contact maintainers privately)

### What to Include

When reporting a security vulnerability, please provide:

1. **Description** - What is the vulnerability?
2. **Location** - Which file(s) or component(s) are affected?
3. **Steps to Reproduce** - How can the vulnerability be reproduced?
4. **Impact** - What could an attacker do with this vulnerability?
5. **Suggested Fix** (optional) - Do you have a suggested fix?

### Response Timeline

- **Acknowledgment** - Within 24 hours
- **Assessment** - Within 72 hours
- **Fix & Release** - As soon as possible (typically 1-2 weeks)
- **Public Disclosure** - After fix is released

## Security Best Practices

This project follows these security practices:

### Authentication & Authorization
- **Clerk** for secure user authentication
- Role-based access control (RBAC) for different user types
- Token-based API authentication with Bearer tokens

### Data Protection
- **PostgreSQL** (Supabase) with encryption at rest
- **HTTPS only** - No unencrypted data transmission
- Environment variables for sensitive configuration
- No secrets committed to repository

### Code Security
- **TypeScript** for type safety
- Input validation on all API endpoints
- CORS configured for approved domains only
- SQL injection prevention via Prisma ORM
- XSS protection via React templating

### Infrastructure Security
- **Vercel** handles SSL/TLS certificates automatically
- Database firewalls via Supabase
- Automatic backups and recovery
- No direct database access from frontend

## Dependency Management

### Regular Updates
- Monthly security audit of dependencies
- Automated dependency updates via Dependabot
- Review and test before deploying updates

### Vulnerable Dependencies
- If vulnerability found in dependency:
  1. Update to patched version immediately
  2. Test thoroughly before releasing
  3. Publish security patch release
  4. Notify users of the vulnerability and fix

## Secure Development Practices

### Code Review
- All code changes require review before merge
- Security-critical changes have extra scrutiny
- Use pull request templates to catch security issues

### Secrets Management
- Never commit `.env` files or API keys
- Use `.env.example` for templates
- Use environment variables for all secrets
- Rotate Clerk keys periodically

### Logging & Monitoring
- Log security-relevant events
- Monitor for suspicious activity
- Review error logs regularly
- No sensitive data in logs

## Compliance

This project handles educational data for a school. We take privacy seriously:

- ✅ No unauthorized data collection
- ✅ Data retention policy in place
- ✅ User data can be requested or deleted
- ✅ GDPR-compliant (if handling EU students)
- ✅ Privacy policy available (see docs/DATA_INTEGRITY.md)

## Third-Party Services

This project uses these third-party services. Review their security policies:

| Service | Purpose | Data Shared | Policy |
|---------|---------|------------|--------|
| **Clerk** | Authentication | Email, name, profile | https://clerk.com/privacy |
| **Supabase** | Database | School data, user profiles | https://supabase.com/security |
| **Vercel** | Deployment | Source code | https://vercel.com/security |

## Security Reporting

If you find a security issue:

1. **DO NOT** post it publicly
2. **DO** email maintainers confidentially
3. **DO** provide detailed information
4. **DO** allow time for a fix
5. **DO** follow up to ensure patch is released

## Security Advisories

Major security vulnerabilities will be announced via:
- GitHub Security Advisory
- Email to stakeholders
- Blog post with impact details

## Questions?

For security questions (not vulnerability reports), please:
- Check this policy first
- Review docs/ARCHITECTURE.md for system security details
- Open a discussion on GitHub
- Contact maintainers

---

**Last Updated:** October 3, 2026  
**Version:** 1.0

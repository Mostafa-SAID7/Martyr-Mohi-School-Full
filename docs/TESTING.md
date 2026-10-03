# Testing Guide

Comprehensive testing documentation for the Martyr Mohi School platform.

## Testing Philosophy

We believe in testing at multiple levels:
- **Unit Tests** - Individual functions
- **Integration Tests** - Components working together
- **E2E Tests** - Complete user workflows
- **Security Tests** - Vulnerability scanning
- **Performance Tests** - Load testing

## Running Tests

### Frontend Tests

```bash
cd frontend

# Run once
npm run test

# Watch mode (re-run on changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Backend Tests (When Implemented)

```bash
cd backend

# Run once
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Writing Tests

### Frontend Example

```typescript
// src/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Backend Example (Future)

```typescript
// src/services/CourseService.test.ts
import CourseService from './CourseService';

describe('CourseService', () => {
  it('should fetch courses', async () => {
    const courses = await CourseService.getCourses();
    expect(courses).toBeArray();
  });
});
```

## Test Coverage

### Current Coverage
- Frontend: ~30% (in progress)
- Backend: ~20% (in progress)
- Target: 80%+ for all code

### Priority Areas for Testing
1. Authentication flows
2. Data validation
3. Error handling
4. User permissions
5. API endpoints

## Running Specific Tests

```bash
# Run specific file
npm run test -- Button.test.tsx

# Run tests matching pattern
npm run test -- --testNamePattern="Button"

# Run with coverage
npm run test -- --coverage

# Update snapshots
npm run test -- --updateSnapshot
```

## Debugging Tests

```bash
# Debug in Chrome DevTools
node --inspect-brk node_modules/.bin/jest --runInBand

# Verbose output
npm run test -- --verbose

# Show which tests ran
npm run test -- --listTests
```

## CI/CD Testing

Tests run automatically on:
- **Push to main** - Full test suite required
- **Pull requests** - All tests must pass
- **Scheduled** - Weekly security tests

View results in GitHub Actions tab.

## Best Practices

### DO ✅
- Write tests alongside code
- Use descriptive test names
- Test behavior, not implementation
- Keep tests simple and focused
- Use test data/fixtures
- Mock external dependencies

### DON'T ❌
- Skip testing
- Write tests that are flaky
- Test private implementation details
- Have tests that depend on each other
- Use real external services
- Ignore test failures

## Test Types

### Unit Tests
- Test single functions/components in isolation
- Mock dependencies
- Fastest tests
- Most coverage needed here

### Integration Tests
- Test multiple components together
- Use real or near-real dependencies
- Medium speed
- Test real workflows

### E2E Tests (Future)
- Test complete user workflows
- Use real application
- Slowest tests
- Most important user paths

### Security Tests
- CodeQL analysis
- npm audit for vulnerabilities
- Secret scanning

## Tools Used

- **Jest** - Test runner
- **React Testing Library** - Component testing
- **CodeQL** - Security analysis
- **Dependabot** - Dependency vulnerability scanning

## Continuous Integration

### GitHub Actions
Tests run automatically on:
```
.github/workflows/
├── test.yml         - Run test suite
├── security.yml     - Security checks
├── codeql.yml       - CodeQL analysis
└── build.yml        - Build verification
```

View status in Pull Requests.

## Test-Driven Development (TDD)

Optional: Write tests before implementation:

1. Write failing test
2. Implement minimum code to pass test
3. Refactor while keeping tests green

This approach ensures:
- Good design
- Better coverage
- Fewer bugs

## Performance Testing

```bash
# Monitor build size
npm run build -- --analyze

# Check bundle size
npm run build && npm run size
```

## Mobile Testing

Test on real devices or emulators:

```bash
# Android emulator
npm run test:mobile -- --android

# iOS simulator
npm run test:mobile -- --ios
```

## Accessibility Testing

```bash
# Run accessibility tests
npm run test -- --testNamePattern="a11y|accessibility"

# Check WCAG compliance
npm run a11y
```

## Documentation

### Adding Tests?
1. Document test purpose in comments
2. Use clear, descriptive names
3. Update this guide if new patterns
4. Link to related issues

### Example Good Test Names
```
✅ should render user dashboard when authenticated
✅ should show error message for invalid email
✅ should disable submit button while loading
```

## Troubleshooting Tests

### Tests Failing Locally but Passing in CI?
- Clear node_modules: `rm -rf node_modules && npm install`
- Update packages: `npm update`
- Check Node version: `node --version` (should be 18+)

### Flaky Tests?
- Check for timing issues (use `waitFor`)
- Verify mocks are isolated
- Review test data consistency

### High Memory Usage?
- Run tests sequentially: `npm run test -- --runInBand`
- Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run test`

## Resources

- **Jest Docs:** https://jestjs.io/
- **React Testing Library:** https://testing-library.com/react
- **Testing Best Practices:** https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

## Contributing Tests

When submitting PRs:
- Include tests for new features
- Ensure tests pass locally
- Check coverage didn't decrease
- Update this guide if needed

---

**Testing Status:** In progress  
**Coverage Target:** 80%+  
**Last Updated:** October 3, 2026

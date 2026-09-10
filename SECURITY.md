# Security Policy

## Supported versions

Proper UI is pre-1.0. Security fixes land on the latest published minor release of each package; there are no
long-term support branches yet.

| Package        | Version | Supported          |
| -------------- | ------- | ------------------ |
| `@properui/ui` | 0.1.x   | :white_check_mark: |
| `@properui/ui` | < 0.1   | :x:                |
| `properui` CLI | 0.1.x   | :white_check_mark: |
| `properui` CLI | < 0.1   | :x:                |

If you copied components into your project with the CLI, you own that code — a fix released here does not reach you
automatically. Re-run `npx properui@latest add <component> --overwrite` to pull it in, and use
`npx properui@latest diff` first to see what you would overwrite.

Once 1.0 ships, this table will move to supporting the current major and the previous one.

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Report it privately by email to **aymanshabaro@gmail.com** with `[security]` in the subject line.

Include as much of the following as you have:

- the affected package and version (or commit),
- a description of the vulnerability and its impact,
- steps to reproduce, ideally a minimal proof of concept,
- any suggested fix or mitigation.

### What to expect

| Stage                               | Target                                       |
| ----------------------------------- | -------------------------------------------- |
| Acknowledgement of your report      | within 3 business days                       |
| Initial assessment and severity     | within 7 business days                       |
| Fix or mitigation plan communicated | within 30 days for confirmed vulnerabilities |

This is a small, volunteer-maintained project, so these are targets rather than guarantees. You will get an honest
status update either way — if a fix is going to take longer, you will be told why.

Please give us a reasonable window to ship a fix before disclosing publicly. We will credit you in the release notes
when the fix goes out, unless you would rather stay anonymous.

## Scope

**In scope**

- Cross-site scripting or injection reachable through a component's public props.
- Arbitrary file write, path traversal or command injection in the `properui` CLI.
- Supply-chain problems in this repository: a compromised build script, a malicious generated registry entry.
- Vulnerable dependency versions pinned by these packages, where the vulnerability is actually reachable.

**Out of scope**

- Vulnerabilities in your own application code, or in components after you have copied and modified them.
- Issues in upstream dependencies where the right fix is a report to that project (report those upstream; tell us if a
  version bump here would help).
- Missing security headers, TLS configuration or similar on any site running the documentation — it is a static site
  with no accounts and no user data.
- Findings from automated scanners with no demonstrated exploit path.
- Accessibility bugs, rendering bugs and correctness bugs: those are ordinary
  [issues](https://github.com/properui/properui/issues), and very welcome as such.

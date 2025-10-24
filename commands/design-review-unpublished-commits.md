# Design Review: Unpublished Commits

## Purpose
This command performs a design review on all unpublished commits in the current repository, analyzing changes that haven't been pushed to the remote yet.

## Usage
```bash
# Review all unpublished commits
design-review-unpublished-commits

# Review commits since a specific branch
design-review-unpublished-commits --since main

# Review commits with specific file types
design-review-unpublished-commits --files "*.ts,*.js,*.py"
```

## What It Does
- Identifies all local commits not yet pushed to remote
- Analyzes each commit for design implications
- Reviews architectural changes and their impact
- Identifies potential design debt or technical issues
- Provides recommendations for improvement

## Output
- Summary of unpublished commits
- Design analysis for each significant change
- Architectural impact assessment
- Recommendations for design improvements
- Risk assessment for the changes

## Integration
- Works with Git repositories
- Integrates with design review agent
- Can be automated in CI/CD pipelines
- Supports various output formats (JSON, Markdown, etc.)













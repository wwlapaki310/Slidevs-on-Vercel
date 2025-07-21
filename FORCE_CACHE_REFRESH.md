# Fix for Vercel build cache issue

This is a dummy commit to force Vercel to recognize the latest changes and clear any build cache.

## Issue
Vercel was still trying to use the `--spa` option that was previously added and then removed.

## Resolution
This commit should force Vercel to use the correct current state of the repository.

## Related
- Issue #31: Presenter/Overview mode 404 errors
- Previous commits that added/removed --spa option

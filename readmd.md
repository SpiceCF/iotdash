# IOT DASHBOARD

## FRONTEND

STACK : NEXTJS, TAILWIND

- NEXTJS :: ทำ DASHBOARD FOR IOT
- TAILWIND ::
- CHART ::
  - :: TIME SERIE ::
    - BAR CHART
    - LINE CHART
- JWT FOR AUTH

## BACKEND

STACK : GOLANG

- GOLANG :: Ex. API Sensor ( MOCK OR RANDOM )

- JWT ?
  | HEADER PAYLOAD SIGNATURE
  | {HASH BASE64}.{HASH BASE64}.{HASH BASE64}

  SYNMETRIC :: PASSWORD ( SAME KEY )
  ASYMMETRIC :: PUBLIC KEY / PRIVATE KEY ( DIFFERENT KEY )

## REQUIREMENT

[Please see](./docs/requirement.md)

```text
- cmd
- internal
  - model
    - sensor.go **
  - service
    - sensor.go **
  - repository
    - port.go 
    - sensor.go **
  - handler
- pkg
  - sensor.go **
```

[REF](https://github1s.com/labasubagia/realworld-backend)

## GIT WORKFLOW

```text
// Check to main branch and pull latest
git checkout main && git pull

// Checkout to target branch (ex. feat/t-1)
git checkout feat/t-1

// Rebase to main branch
git rebase main

// Resolve conflict if any and continue rebase
git rebase --continue

// When rebase is done, force push to remote for update line history
// !! BE CAREFUL WITH FORCE PUSH, IT WILL OVERWRITE THE HISTORY !!
git push -f

// Squash commit (ex. 3 commit before HEAD)
git rebase -i HEAD~3

// Edit commit message (s for squash , p for pick)
// Example
// pick 1234567890 abc
// squash 1234567890 def
// squash 1234567890 ghi
// save and exit then
// edit commit message

```

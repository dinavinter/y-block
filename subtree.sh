
# pull apps/hocuspocus  from https://github.com/ueberdosis/hocuspocus/tree/main/playground:
$ git checkout hp/main
$ git subtree split -P playground -b temporary-split-branch
$ git checkout main
$ git subtree merge --squash -P apps/hocuspocus temporary-split-branch
# Now fix any conflicts if you'd modified third_party/git-completion.
$ git branch -D temporary-split-branch



## ADDING A SUBTREE
$ git remote add -f -t master --no-tags gitgit https://github.com/git/git.git
$ git checkout gitgit/master
$ git subtree split -P contrib/completion -b temporary-split-branch
$ git checkout master
$ git subtree add --squash -P third_party/git-completion temporary-split-branch
$ git branch -D temporary-split-branch

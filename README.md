# CSC431: Intro to Software Engineering

#### Useful & Important Links
  * [The basics of git][git-book]
    * [Install git][download-git]
    * [How to submit a pull request][pull-request-guide]
  * [Download LaTeX][latex-download]
    * [LaTeX quick start guide][latex-quick-start]
  * [MarkDown reference][markdown-ref]

#### Contributing
For now, we'll use pull requests. Consult the [guide][pull-request-guide] for
pull requests and how to submit one to this repository.

When everyone becomes more comfortable with git, everyone can become a
contributor to this repository, which will allow you to commit without
submitting a pull request.

#### LaTeX Style
  * Indent with two spaces
  * Lines should never be longer than 80 characters.

#### Code Style
We will use the [Airbnb JavaScript Style Guide][airbnb-style].

Why? Because it's simple, clean, and we can all refer to it. Now we don't have
to argue over style choices and can instead focus on writing code.

The gist of it is
  * 2-space soft tabs: <code> </code><code> </code> not a `\t` tab character.
  * Lines which are **NOT** longer than 80 characters.
  * `function (arg1, arg2) {` Note the spacing.
  * `camelCase`
  * `const` and `let`, not `var`
  * if-else blocks always with Egyptian braces.

    ```js
    if (condition) {
      // ...
    } else {
      // ...
    }
    ```

  * Use `'` instead of `"` for strings.
  * Use `[]` and `{}` for arrays and objects, respectively.

You can read the guide for the gritty details.


<!-- Reference-style links go here -->
<!-- Keep alphabetized, please. -->
[airbnb-style]: https://github.com/airbnb/javascript
[download-git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[git-book]: https://git-scm.com/book/en/v2
[latex-download]: https://www.latex-project.org/get/
[latex-quick-start]: https://www.latex-tutorial.com/tutorials/quick-start/
[markdown-ref]: https://guides.github.com/features/mastering-markdown/
[pull-request-guide]: https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/

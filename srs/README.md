# Software Requirements Specification

Everything will be written in LaTeX. You will soon come to appreciate this fact.

#### Quick Facts
  * LaTeX files are given the `.tex` file extension.
  * Use 2 spaces for indentation.
  * Lines should never be longer than 80 characters.
  * Guide to LaTeX [tables][latex-tables], but usually an
    [automatic table generator][table-generator] is best.
  * LaTeX [quick start][latex-quick-start].

#### Sample
```
% This is how comments are written
% There are other types of document classes. 'article' is but one type.
\documentclass{article}

% For purposes of indentation, pretend this isn't here.
\begin{document}        

\section{This is a Numbered Section}
  You can put text here.
  \subsection{This is a Numbered Subsection}
    More text?
    \subsubsection{This is a Numbered Subsubsection}
      Does it go deeper? Not really. But this will work for us.

  \subsection{Subsection 2}
    Note the extra line between subsections.

\section{Formatting}
  \subsection{Lists}
    \subsubsection{Bulleted}
      This is how you do a bulleted list
      \begin{itemize}
        \item content here      % use this when every item will be really short
        \item{                  % more often, you should use this format
          content here
        }
      \end{itemize}

    \subsubsection{Numbered}
      \begin{enumerate}
        \item{
          etc.
        }
      \end{enumerate}

  \subsection{Tables}
    % You should read a guide on this.
    \begin{table}[h!]
      \caption{Computational Constraints}
      \label{system-constraints/hardware/computation-table}
      \begin{tabularx}{\textwidth}{|l|X|}
        \hline
        Title       & Computational Constraints. \\ \hline
        Description & Amount of computation and processing power available to
                      the application. \\ \hline
        Priority    & Low: 5. \\ \hline
      \end{tabularx}
    \end{table}

\end{document}
```

<!-- Reference-style links go here -->
<!-- Keep alphabetized, please. -->
[latex-quick-start]: https://www.latex-tutorial.com/tutorials/quick-start/
[latex-tables]: https://en.wikibooks.org/wiki/LaTeX/Tables
[table-generator]: http://www.tablesgenerator.com

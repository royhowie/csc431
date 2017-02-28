# Software Requirements Specification

Everything will be written in LaTeX. You will soon come to appreciate this fact.

#### Quick Facts
  * LaTeX files are given the `.tex` file extension
  * Use 2 spaces for indentation
  * Guide to LaTeX [tables][latex-tables]
  * [LaTeX quick start][latex-quick-start]

#### Sample
```
% This is how comments are written
\documentclass{article}

\begin{document}

\section{This is a Numbered Section}
  You can put text here.
  \subsection{This is a Numbered Subsection}
    More text?
    \subsubsection{This is a Numbered Subsubsection}
      Does it go deeper? Not really. But this will work for us.

  \subsection{Subsection 2}
    Not the extra line between subsections.

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
    \begin{table}
      \centering
      \caption{Example Survival Setup}\label{table-survival-example}
      \begin{tabular}{l | lllllc}
        % $p_i$      & 0    & 1     & 2     & 3     & 4      \\ \hline
        $P$      & 0    & 25000 & 75000 & 99999 & 123548 & - \\ \hline
        $F$      & 1.21 & 4.18  & 21.61 & 5.32  & 23.99  & - \\ \hline
        $C$      & 0    & 1.21  & 5.39  & 27.00 & 32.32  & 56.31
      \end{tabular}
    \end{table}


\end{document}
```

<!-- Reference-style links go here -->
<!-- Keep alphabetized, please. -->
[latex-quick-start]: https://www.latex-tutorial.com/tutorials/quick-start/
[latex-tables]: https://en.wikibooks.org/wiki/LaTeX/Tables

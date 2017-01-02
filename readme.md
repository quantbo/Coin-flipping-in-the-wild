##Coin flipping in the wild

A common way to model, or think about, binary repsonses is to view them as instances of coin flipping. In this view the coin flips are usually assumed to be independent: prior flips do not affect subsequent ones.

On the Internet, in contrast, a user providing a like or dislike, thumbs up or thumbs down, etc., commonly sees the ratings provided by prior users. In addition, when multiple items are being rated a user sees which items have attracted many responses and which have been neglected. Binary respones collected under these circumstances cannot be viewed as independent.

I provide a model of binary responding on the Internet that assumes that users apply Bayesian inference when deciding which item to respond to, and whether to choose thumbs up or thumbs down. An interactive simulation shows that a stream of users arriving at a web page without any predispositions (with uniform priors, in Bayesian terms) will typically drive one or more binary response probabilities far from 1/2, the value to which they would converge if responses were independent. This tendency for responses probabilities to deviate strongly from the neutral dispositions of the individual users occurs purely as the result of herding.

There are two conclusions:

1) Data scientists should take herding into account when assessing responding on the Internet.

2) Bayesian inference, applied sequentially, can lead to misleading conclusions.

The web page for the present project can be viewed on <a href='https://quantbo.github.io/' target="_blank">My GitHub Pages</a>.
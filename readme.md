##Coin flipping in the wild

A common way to model, or think about, binary repsonses is to view them as instances of coin flipping. In this view the coin flips are assumed to independent: prior flips do not affect subsequent ones.

On the Internet, in contrast, a user providing a like or dislike, thumbs up or thumbs down, etc., commonly sees the ratings provided by prior users. In addition, when multiple items are being rates, a user sees which items have attracted many responses and which have been neglected. Binary respones collected under these circumstances cannot be viewed as independent.

I provide a model of binary responding on the Internet that assumes that users apply Bayesian inference when deciding which item to respond to, and whether to choose thumbs up or thumbs down. An interactive simulation shows that a stream of users arriving at a web page without any predispositions (with uniform priors, in Bayesian terms) will typically drive one or more binary response probabilities far from their intial values of 1/2. This occurs purely by the operation of herding.

There are two conclusions:

1) Data scientists should account for herding when assessing responding on the Internet.

2) Bayesian inference, applied sequentially, can lead to misleading conclusions.
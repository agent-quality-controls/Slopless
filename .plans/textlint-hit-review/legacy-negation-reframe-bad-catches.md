# Negation-Reframe Bad catches
Source: `/tmp/prosesmasher-textlint-fixtures.json` generated from the existing `.md` fixture corpus.
Scope: textlint `negation-reframe` findings only. This is a judgment file, not a golden baseline.
This version stores both the matched fragment and the full review context needed to build a later no-signal fixture.
Total: 115
## Counts
- `bare-not-just-fragment`: 101
- `single-node-or-fragment`: 11
- `pronoun-reframe-pair`: 1
- `other-sentence-pair`: 1
- `same-prefix-pair`: 1

## Findings
### 1. `pronoun-reframe-pair`
- File: `fixtures/explainers/gpt_5_4_mini/burnout-at-work.md:3`
- Reason: factual definition/passive clause, not a rhetorical reframe
- Matched text:

```text
The World Health Organization describes burnout as an occupational phenomenon that comes from chronic workplace stress that has not been managed well. It is marked by exhaustion, cynicism or mental distance from the job, and reduced effectiveness.
```

- Review context:

```text
Burnout is one of those words that gets used for everything from a bad Monday to a job that is quietly eating someone alive. The useful version is narrower. The World Health Organization describes burnout as an occupational phenomenon that comes from chronic workplace stress that has not been managed well. It is marked by exhaustion, cynicism or mental distance from the job, and reduced effectiveness.
```

### 2. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/burnout-at-work.md:5`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
That matters because burnout is not just a mood. It tends to show up when the job keeps demanding more than a person can give for too long, with too little control, support, or recovery time. The result is a body and brain that keep treating work like a threat, even when the calendar insists it is just Tuesday.
```

### 3. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/burnout-at-work.md:46`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Second, burnout is linked to worse work outcomes. A 2024 systematic review and meta-analysis found that nurse burnout was associated with lower patient safety, lower patient satisfaction, and lower quality of care. That finding was consistent across studies and settings. In plain language, burnout is not just a personal issue. It changes how work gets done.
```

### 4. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/does-social-media-harm-attention-span.md:39`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
This is especially true when social media is used in the background while doing something else. A student studying with a feed open is not just "using social media." They are splitting attention, carrying a load of unfinished task goals, and paying a switching tax each time they glance over.
```

### 5. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/how-chronic-stress-affects-the-body.md:55`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
That matters because the body then has to deal with both the stress response and the coping habits built around it. Stress does not just create symptoms. It can recruit a full set of less useful habits and call them coping.
```

### 6. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/how-chronic-stress-affects-the-body.md:112`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Chronic stress is not just feeling busy or annoyed. It is a repeated body-wide alarm that can affect sleep, mood, digestion, immunity, pain, and the cardiovascular system. The earlier you treat it as a real health issue, the easier it is to interrupt the cycle.
```

### 7. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/how-loneliness-affects-mental-and-physical-health.md:3`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Loneliness is not just a bad mood with a nicer name. It is a health state with real effects on the brain, the body, and daily behavior. People can feel lonely while surrounded by other people, and they can feel fine while living alone. The issue is not the number of bodies in the room. It is whether a person feels connected, supported, and seen.
```

### 8. `single-node-or-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-adults-feel-tired-all-the-time.md:9`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
In other words,
```

- Review context:

```text
MedlinePlus describes fatigue as a symptom, not a disease. The NHS says common causes include poor sleep, stress, depression, hormone changes, some illnesses, and some medicines. In other words, "I am tired all the time" is not a diagnosis. It is a clue.
```

### 9. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-adults-feel-tired-all-the-time.md:41`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Diabetes can also show up as fatigue. MedlinePlus lists fatigue among the common symptoms, along with thirst, hunger, frequent urination, blurry vision, and unexplained weight loss. High blood sugar does not just sit there politely. It disrupts energy use and can leave you worn down before you know why.
```

### 10. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-children-have-tantrums.md:111`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Red flags include tantrums that happen daily, last a long time, involve serious aggression, or include self-injury such as head banging, biting, or hitting the head against objects. Seek help if a child cannot calm down at all, seems miserable between tantrums, or the outbursts happen across settings, not just at home.
```

### 11. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-couples-stop-communicating-well.md:25`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Attachment history also matters. In a 2024 *PLOS ONE* study, insecure attachment shaped how people told stories about relationship highs and transgressions. Avoidant partners were more likely to build accounts that kept distance in place. In plain English, some people do not just remember conflict differently. They build a version of the relationship that expects distance, and then they act like that expectation is truth.
```

### 12. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-couples-stop-communicating-well.md:79`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
1. Name the pattern, not just the complaint.
2. Pick one regular time to talk when neither of you is already fried.
3. End each difficult conversation with one concrete next step.
```

### 13. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-modern-friendships-fade-over-time.md:29`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
A longitudinal study by Ajrouch, Hu, Webster, and Antonucci, published in *Developmental Psychology*, followed adults over 23 years. It found that increasing positive friendship quality predicted better health later on. That matters here because it suggests the friendship itself is not just a pleasant extra. It is part of the health equation. When friendships fade, people are not only losing company. They are losing a regular source of support, identity, and stability.
```

### 14. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-modern-friendships-fade-over-time.md:39`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
There is also loneliness, which is not just being alone. Loneliness is the gap between the connection you want and the connection you have. The health literature keeps finding that this gap matters. Dunbar’s review links friendship loss and loneliness to adverse mental and physical effects. The broader public health literature reaches the same basic conclusion: social connection matters to wellbeing, and sustained isolation is not harmless background noise.
```

### 15. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-modern-friendships-fade-over-time.md:53`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Invest in depth, not just contact. A string of quick reactions can keep the line warm, but it will not replace a real conversation. Ask better questions. Talk about the annoying thing, the family issue, the job uncertainty, the weird hope, the thing you have not told anyone else. Depth is what makes a friendship worth the work.
```

### 16. `bare-not-just-fragment`
- File: `fixtures/explainers/gpt_5_4_mini/why-people-struggle-to-build-habits.md:21`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Another useful line of work comes from Wendy Wood and Dennis Runger’s 2016 review, *Psychology of Habit*. It explains that habits are not just about intention. They sit beside goals, and sometimes they help goals while other times they run on autopilot even when the goal has faded. In plain English, motivation gets the habit started. Repeated cue-response pairing keeps it alive.
```

### 17. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/adult_procrastination_causes_and_fixes/article.md:54`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
#### 3) Deal with the feeling, not just the task
Procrastination often means “I don’t want to feel what this task makes me feel.” Try naming it:
```

### 18. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/how_burnout_develops_at_work/article.md:75`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Recovery is not just “self-care.” It is the combination of **restoring your capacity** and **changing the conditions that keep draining it**. If you only do one, you often relapse.
```

### 19. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/how_burnout_develops_at_work/article.md:91`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
- **Force-rank priorities.** Convert your list into “must / should / could.” If everything is urgent, nothing is.
- **Negotiate scope, not just time.** “I can deliver A by Friday. If you also need B, what moves?” This turns endurance into trade-offs.
- **Make work visible.** Define owners, deadlines, and what “done” means. Clarity reduces mental load.
- **Fix the calendar.** Cut or shorten low-value meetings, add agendas, and protect small focus blocks.
```

### 20. `single-node-or-fragment`
- File: `fixtures/gpt_5_2_chat/screen_time_and_child_attention/article.md:81`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
Give screens a clear
```

- Review context:

```text
- **Toddlers and preschoolers (about 2 to 4 years)**: Favor calm, educational programming you can recognize and trust. Be especially cautious with open video platforms and autoplay. If you use them at all, curate a short playlist and turn off autoplay so your child is not pulled into an endless chain of recommendations. Avoid giving a young child open access to a phone or tablet; the easiest boundary to enforce is "devices come out for specific times, then go away." Screens should not crowd out the main jobs of this age: play, language, learning to handle big emotions, and sleep.
- **School-age kids**: Watch for media multitasking. If attention is slipping at school, reduce background media and help your child practice single-task focus: homework in short blocks, notifications off, phone out of reach. Give screens a clear "home" in the schedule, not a constant presence.
- **Teens**: The issue is often less about cartoons and more about social media, messaging, and sleep. Encourage "quiet hours" at night (devices charging outside the bedroom if possible), and talk openly about how apps are designed to keep attention and provoke emotion. Teens tend to respond better to collaboration ("Let's protect your sleep and your time") than surveillance.
```

### 21. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/stress_and_physical_symptoms/article.md:3`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Stress is usually talked about as a feeling: worry, pressure, overwhelm. But stress is also a whole-body state. When your brain decides something is threatening, urgent, or out of control, it changes your physiology, not just your thoughts. That is why many people notice stress first through the body: headaches, stomach issues, tight chest, muscle pain, fatigue, trouble sleeping.
```

### 22. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/why_couples_stop_communicating/article.md:67`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**1. Name the pattern, not just the topic.**
Try: "I think we are doing the push-withdraw thing again. Can we slow down and try a different approach?" Turning the loop into the shared enemy reduces blame and makes cooperation possible.
```

### 23. `single-node-or-fragment`
- File: `fixtures/gpt_5_2_chat/why_couples_stop_communicating/article.md:77`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
Swap:
```

- Review context:

```text
**3. Start softer than you think you need to.**
How you begin shapes the entire conversation. Starting with accusation invites defense.
Swap:
"You never help."
For:
"I’m overwhelmed. Can you take dishes tonight, and can we talk Sunday about a better split?"
Soft does not mean weak. It means strategic.
```

### 24. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/why_people_lose_motivation_after_big_goals/article.md:35`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
#### 3. You lose structure and clarity, not just motivation
```

### 25. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/why_people_lose_motivation_after_big_goals/article.md:110`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
#### 5. Choose the next target based on values, not just escalation
```

### 26. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/why_people_wake_up_tired/article.md:13`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Along the way, you will find practical ways to identify likely causes and concrete steps to fix what is fixable.
### First: “A full night” is not just time in bed
Most adults need at least 7 hours of sleep per night, and many do best closer to 8 or 9. But there are two easy ways “I slept eight hours” becomes a mirage:
```

### 27. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/why_people_wake_up_tired/article.md:83`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Insomnia is not just “can’t fall asleep.” It can also be waking up a lot, waking up too early, or sleeping lightly and feeling unrefreshed. Many people underestimate how much time they are awake during the night, especially if they stay in bed.
```

### 28. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/why_people_wake_up_tired/article.md:154`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
How to identify it:
- Low mood or loss of interest most days, plus changes in sleep, appetite, or concentration
- The tiredness is not just sleepiness; it feels like “no fuel”
What to do:
```

### 29. `bare-not-just-fragment`
- File: `fixtures/gpt_5_2_chat/why_people_wake_up_tired/article.md:219`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
- If there are signs of sleep apnea or severe daytime sleepiness, push for screening rather than endlessly “doing better sleep hygiene.”
- If insomnia is chronic, seek CBT-I.
- If timing is the issue (you can sleep well on your own schedule but not on the world’s), treat it as a circadian problem and use light/timing strategies, not just “go to bed earlier.”
- If fatigue is persistent and not explained by sleep, consider a medical workup.
```

### 30. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/adult_procrastination_causes_and_fixes/article.md:39`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Over time, procrastination narrows a person’s life. Big goals get postponed into abstract someday territory. Career moves stall. Financial planning waits until there is a problem. Creative projects become identity ornaments, things you "want to do" but never inhabit. The cost is not just stress. It is lost momentum.
```

### 31. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/how_burnout_develops_at_work/article.md:3`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Burnout rarely arrives in one dramatic moment. It usually builds slowly, almost politely, until a person who once cared about the job begins to feel drained, detached, and strangely numb. The common picture is someone working late, answering emails at midnight, and running on caffeine and obligation. That picture is not wrong, but it is incomplete. Burnout is not just about long hours. It is a stress condition that develops when job demands keep outpacing the emotional, cognitive, and physical resources needed to meet them.
```

### 32. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/how_burnout_develops_at_work/article.md:11`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
This matters because burnout is not just “being tired.” A busy season can leave someone tired. Burnout changes how work feels, how stress lands in the body, and how a person sees themselves inside the job. It can make competent people feel broken when the real problem is a work system that has become unsustainable.
```

### 33. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/how_burnout_develops_at_work/article.md:47`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Career effects can linger too. Burned-out people may disengage from development, avoid opportunities, or quit abruptly without enough recovery or planning. Some start to distrust their own ambition altogether. They do not just want a better job. They want distance from the entire identity that got them here.
```

### 34. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/how_burnout_develops_at_work/article.md:51`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Burnout recovery starts with honesty. If a person is deeply depleted, the goal is not to “push through smarter.” It is to reduce the load and restore capacity. Sometimes that means taking time off. Sometimes it means renegotiating scope, saying no to optional work, or ending the habit of constant availability. Recovery almost always requires a real change in conditions, not just a better morning routine.
```

### 35. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/social_anxiety_in_daily_life/article.md:5`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Social anxiety is not just shyness, and it is not always obvious. Some socially anxious people are quiet and visibly uncomfortable. Others are polished, funny, and outwardly competent while internally running a full surveillance operation on every word they say. The common thread is fear of negative evaluation. The person expects scrutiny, rejection, embarrassment, or humiliation, and that expectation makes ordinary social life feel much more dangerous than it actually is.
```

### 36. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/stress_and_physical_symptoms/article.md:13`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
This is why stress can produce physical problems without any obvious injury or infection. The body is responding to perceived demand, not just visible danger.
```

### 37. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/why_couples_stop_communicating/article.md:27`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Then there is the slow poison of contempt. Eye-rolling, mocking, sarcasm, dismissive laughter, and a tone of superiority can damage communication faster than almost anything else. These behaviors signal not just anger but disrespect, and once respect weakens, openness tends to follow.
```

### 38. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/why_people_lose_motivation_after_big_goals/article.md:7`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Psychology has a few useful explanations for this. Research on self-determination theory shows that motivation lasts longer when a goal feels chosen, meaningful, and tied to your own values, not just to status or pressure. Research on goal pursuit shows that people often get "stuck in the middle," with motivation dipping halfway through long efforts. Research on hedonic adaptation points to another rude fact: humans get used to wins fast. The high fades, even after something you worked for a long time to get.
```

### 39. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/why_people_lose_motivation_after_big_goals/article.md:9`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
So the problem is not just weak discipline. The problem is that **many big goals are built like emotional fireworks, not like repeatable systems.**
```

### 40. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/why_people_lose_motivation_after_big_goals/article.md:65`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Choose goals you can explain plainly. Why do you want this? What value does it serve? What kind of person does it let you be on ordinary days, not just on achievement day? If the answer is mostly status, envy, or panic, expect unstable motivation.
```

### 41. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/why_people_struggle_to_build_habits/article.md:9`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
A habit is a behavior that becomes easier to perform through repetition in a stable context. It is not just something you want to do often. It is something your brain learns to initiate with less conscious effort because the cue and the response have been paired repeatedly.
```

### 42. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4/why_people_wake_up_tired/article.md:33`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Late-night screen use is another common culprit. Screens can delay bedtime, stimulate the brain, and expose people to bright light at the wrong time, which can interfere with the signals that help regulate sleep. It is not just the light, either. It is also the mental activation of messages, news, videos, and the endless temptation to keep consuming one more thing.
```

### 43. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/adult_procrastination_causes_and_fixes/article.md:21`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Procrastination is not just a productivity issue. It spreads.
```

### 44. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/adult_procrastination_causes_and_fixes/article.md:49`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Finally, if procrastination is chronic, severe, or tied to anxiety, depression, ADHD, burnout, or perfectionism that has become absurdly expensive, get help for the driver, not just the deadline. The behavior is often the visible tip of a deeper pattern. Treating the surface without the engine is how people end up buying planners they never open.
```

### 45. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/how_burnout_develops_at_work/article.md:3`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Burnout is not just “being tired.” The World Health Organization defines it as a syndrome caused by chronic workplace stress that has not been successfully managed, and it describes three core dimensions: exhaustion, mental distance or cynicism toward the job, and reduced professional efficacy. That matters because burnout usually does not arrive all at once. It develops gradually, as the demands of work keep outpacing the resources a person has to recover, adapt, or regain control.
```

### 46. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/how_burnout_develops_at_work/article.md:33`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
There is a broader organizational cost too. Burnout spreads through teams. It raises turnover, damages morale, increases conflict, and weakens institutional memory. When experienced staff leave, the remaining employees inherit more work, which can accelerate the same cycle. In that sense, burnout is not just an individual wellness issue. It is a systems problem with a human face.
```

### 47. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/screen_time_and_child_attention/article.md:13`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Another reason is that many digital products are designed to be hard to leave. Fast rewards, endless feeds, autoplay, alerts, and variable reinforcement all make stopping harder than starting. That does not mean a child has “addiction” in the clinical sense. It does mean that a child who melts down when a device is removed may be responding to a highly sticky environment, not just weak self-control. The American Academy of Pediatrics explicitly notes that parents often see the problem when kids can’t sleep, can’t concentrate, or can’t walk away from screens.
```

### 48. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/screen_time_and_child_attention/article.md:15`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
There is also an age issue. Younger children are still building self-regulation, language, and executive function. In early childhood, even small shifts in how media is used can matter more than later on. A screen in the background during play or meals can fragment attention; a caregiver using a phone during routines can reduce the back-and-forth interaction that helps children learn to focus on people, not just pixels. By adolescence, the pattern changes: social media, group chats, and late-night use may affect attention more through sleep loss, stress, and constant interruption than through any direct damage to “attention span.”
```

### 49. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/screen_time_and_child_attention/article.md:29`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
What should parents do? Start by treating screens as one part of a household system, not a moral failure. The best guidance is usually practical, not punitive. Build a family media plan. Keep devices out of bedrooms. Protect the hour before bed. Keep meals and shared family time screen-free. For younger children, use screens with them, not just near them. Co-viewing and co-playing are not perfect solutions, but they make media more social, more guided, and less likely to become a substitute for interaction.
```

### 50. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/stress_and_physical_symptoms/article.md:3`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Yes. Stress is not just a mood with a bad reputation. It is a body-wide response to a challenge, threat, or pressure, and the body treats it like a real event because it is one. Your brain flags danger, stress hormones rise, and systems that normally run quietly in the background, such as heart rate, breathing, digestion, and muscle tone, shift into high gear. That response helps in short bursts. It is useful when you need to brake hard in traffic, finish a deadline, or get through a tense conversation without falling apart in the office kitchen.
```

### 51. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/stress_and_physical_symptoms/article.md:5`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
The problem starts when stress does not switch off. Short-term stress can sharpen focus. Long-term stress keeps the body in a state of strain, and that strain shows up in physical symptoms. Medical sources from the NHS, MedlinePlus, and Cleveland Clinic all describe stress as something that can affect the body, not just the mind. When stress becomes frequent or constant, people often start to notice headaches, stomach trouble, tight muscles, poor sleep, chest discomfort, fatigue, and a general sense that their body is doing something irritating on purpose.
```

### 52. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/stress_and_physical_symptoms/article.md:28`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Long-term stress matters because it can crowd out recovery. The body needs periods of real downshifting: sleep, movement, quiet, food that is not just caffeine and regret, and enough mental slack to stop treating every minor inconvenience like a fire alarm. Without recovery, stress can contribute to bigger problems over time, including persistent high blood pressure, anxiety, depression, digestive issues, and reduced immune function. That does not mean stress alone causes every illness. It does mean chronic stress is not harmless background noise. It is a physiological burden.
```

### 53. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/why_friendships_fade/article.md:18`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Loneliness makes the wrong story louder. CDC data show that loneliness and lack of social and emotional support are linked with much higher rates of stress, frequent mental distress, and depression. In 2022 U.S. data, adults who reported loneliness had adjusted prevalence ratios of 3.61 for stress, 3.05 for frequent mental distress, and 2.38 for history of depression compared with those who did not report loneliness. That is not just “feeling a bit off.” That is a real mental health tax.
```

### 54. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/why_friendships_fade/article.md:22`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
There is a physical cost too. The CDC and Surgeon General’s advisory both treat social connection as a health issue, not decorative advice from someone with a linen shirt. Social disconnection is associated with heart disease, stroke, dementia, type 2 diabetes, depression, anxiety, and premature mortality. Friendship loss does not just feel bad. It can reshape sleep, stress, mood, and how safely a person moves through the world.
```

### 55. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/why_people_lose_motivation_after_big_goals/article.md:27`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Then comes contact with reality. The work is slower than expected, the first week is awkward, and progress is too small to feel dramatic. If the goal is very specific and very ambitious, failure becomes easy to notice. Research on goal failure suggests that missing a high, specific goal can reduce motivation for future tasks and produce emotional fallout that needs active recovery, not just more willpower [Goal Missed, Self Hit](https://pmc.ncbi.nlm.nih.gov/articles/PMC8490751/).
```

### 56. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/why_people_lose_motivation_after_big_goals/article.md:29`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
After that comes the emotional wobble. A blocked goal can trigger anger, frustration, shame, or sadness. Those emotions do different jobs. Anger can energize persistence, but sadness tends to pull attention away from an unrewarding goal and toward disengagement [blocked goal, anger and sadness](https://pubmed.ncbi.nlm.nih.gov/29429569/). That means the emotional response is not just a byproduct. It changes whether you push, pause, or quit.
```

### 57. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/why_people_lose_motivation_after_big_goals/article.md:51`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
- Shrink the first step until it feels almost unserious.
- Attach the step to a clear cue.
- Track repetitions, not just outcomes.
- Expect slips and plan the restart in advance.
- Make the behavior rewarding now, not only later.
```

### 58. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/why_people_struggle_to_build_habits/article.md:3`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
People love the fantasy version of habit change. In that version, you decide to floss, run, journal, or stop doom-scrolling, and your life politely rearranges itself. Real life is less obedient. Habits fail because they are not just promises you make to yourself. They are behaviors your brain has learned to run on familiar cues, in familiar settings, with the least possible effort.
```

### 59. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/why_people_struggle_to_build_habits/article.md:11`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
The second obstacle is context. Habits are not just behaviors, they are behaviors tied to a place, time, or preceding event. If you only meditate when the apartment is silent, or only write after your morning coffee, then the habit depends on those conditions showing up. Change the commute, the schedule, the kids’ sleep, or the job, and the cue disappears. Research on context stability shows that behaviors repeated in stable settings become stronger habits, while context changes can weaken them or break the link entirely. This is why so many people do fine during a calm month and fall apart the second life gets noisy. Life always gets noisy.
```

### 60. `bare-not-just-fragment`
- File: `fixtures/gpt_5_4_mini/why_people_wake_up_tired/article.md:3`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
A full night in bed is not the same thing as restorative sleep. You can spend eight hours under the covers and still wake up feeling like you lost a fight with a pillow, because the problem is often sleep quality, sleep timing, or an underlying condition, not just sleep length.
```

### 61. `other-sentence-pair`
- File: `fixtures/haiku/social_anxiety_in_daily_life/article.md:11`
- Reason: legitimate genetic-risk clarification, not slop
- Matched text:

```text
This doesn't mean that if your parent has social anxiety, you're guaranteed to develop it, but rather that you may inherit a predisposition toward it. This genetic component likely influences how your brain processes social information and perceives threat.
```

- Review context:

```text
Interestingly, social anxiety appears to run in families. Twin studies have demonstrated that genetics account for approximately one-third of the differences in social anxiety levels among adults. This doesn't mean that if your parent has social anxiety, you're guaranteed to develop it, but rather that you may inherit a predisposition toward it. This genetic component likely influences how your brain processes social information and perceives threat.
```

### 62. `bare-not-just-fragment`
- File: `fixtures/haiku/why_friendships_fade/article.md:85`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
The shift toward valuing quality over quantity, and intentionality over convenience, represents a maturation of how we approach friendship. In 2026, we're seeing a cultural acknowledgment that sustainable friendships require genuine alignment of values, not just shared circumstances.
```

### 63. `single-node-or-fragment`
- File: `fixtures/haiku/why_friendships_fade/article.md:91`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
The next time you think of an old friend, don't let that thought evaporate into the ether.
```

- Review context:

```text
The next time you think of an old friend, don't let that thought evaporate into the ether. Reach out. The barrier you imagine is far higher than the one they're experiencing. Vulnerability is the antidote to the silence that kills friendships—and it may be the most valuable investment you make in your own well-being.
```

### 64. `single-node-or-fragment`
- File: `fixtures/haiku/why_people_lose_motivation_after_big_goals/article.md:73`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
When you hit week 3 or 4 and motivation drops, don't panic.
```

- Review context:

```text
When you hit week 3 or 4 and motivation drops, don't panic. That's not a signal to quit—that's confirmation that you're following a normal human progression. Remind yourself explicitly that informed pessimism and the Valley of Despair are standard features of any meaningful change, not bugs in your system.
```

### 65. `bare-not-just-fragment`
- File: `fixtures/instagram/gpt_5_4/what-stress-does-to-the-body-and-how-to-slow-it-down.md:1`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Stress is not just a mental state. It is a full-body alarm, and when it stays on too long, your body starts paying the bill.
```

### 66. `bare-not-just-fragment`
- File: `fixtures/instagram/gpt_5_4/why-overloaded-children-seem-rude.md:9`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
That does not mean every sharp tone gets a free pass. It means the best response starts with reading the state, not just the attitude.
```

### 67. `bare-not-just-fragment`
- File: `fixtures/instagram/gpt_5_4_mini/why-overloaded-children-seem-rude.md:15`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
If you keep seeing big reactions, ask what the child is carrying, not just what they are saying. The surface behavior is usually the loudest part. It is rarely the whole story.
```

### 68. `bare-not-just-fragment`
- File: `fixtures/instagram/gpt_5_4_mini/why-rest-is-not-the-same-as-recovery.md:3`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
You can stop, sit down, and still not feel better. You can take a nap, scroll for an hour, and wake up carrying the same tension in your jaw, shoulders, and stomach. That is because recovery is not just time off. It is the nervous system coming down from a state of strain.
```

### 69. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4/burnout-taught-me-about-productivity.md:9`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Now I pay attention to a few boring signals. Can I focus on one hard thing without reaching for my phone? Am I making clean decisions, or just clearing discomfort? Did I leave enough room in the day for work that needs thought, not just reaction?
```

### 70. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4/how-stress-hurts-decision-making-at-work.md:1`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Stress at work does not just make people feel worse.
```

### 71. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4/what-people-get-wrong-about-habit-building.md:21`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
That means removing friction matters more than adding pressure. Put the book on the pillow. Leave the shoes by the door. Open the doc before you go to bed. Prep the trigger, not just the intention.
```

### 72. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4/why-high-performers-procrastinate.md:5`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
If you have a strong reputation, every piece of work starts carrying extra weight. The deck is not just a deck. It is proof you are still sharp. The strategy memo is not just a memo. It is a quiet referendum on whether people were right to trust you in the first place.
```

### 73. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4/why-high-performers-procrastinate.md:5`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
If you have a strong reputation, every piece of work starts carrying extra weight. The deck is not just a deck. It is proof you are still sharp. The strategy memo is not just a memo. It is a quiet referendum on whether people were right to trust you in the first place.
```

### 74. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4/why-modern-work-makes-people-feel-constantly-behind.md:17`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**A healthy workload is not just about volume. It is about recoverable attention.**
```

### 75. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4_mini/burnout-taught-me-about-productivity.md:11`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Now I measure productivity by quality of attention, not volume of activity. Can I finish one important thing without constant context switching? Can I make a decision without exhausting myself? Do I have enough space in the day to do work that requires thought, not just speed?
```

### 76. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4_mini/burnout-taught-me-about-productivity.md:24`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
I still care about ambition. I just care more now about whether my system lets me do good work tomorrow, not just get through today.
```

### 77. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4_mini/how-stress-hurts-decision-making-at-work.md:1`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Stress at work does not just make people tired.
```

### 78. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4_mini/what-people-get-wrong-about-habit-building.md:21`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
That means removing friction matters more than adding pressure. Put the book on the pillow. Leave the shoes by the door. Open the doc before you go to bed. Prep the trigger, not just the intention.
```

### 79. `bare-not-just-fragment`
- File: `fixtures/linkedin/gpt_5_4_mini/why-modern-work-makes-people-feel-constantly-behind.md:21`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
People do better when their work gives them evidence of progress, not just more input.
```

### 80. `bare-not-just-fragment`
- File: `fixtures/opus_4_6/screen_time_and_child_attention/article.md:19`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
The concern is not just behavioral. Neuroimaging research has revealed that prolonged screen exposure can alter the physical structure of children's brains during critical windows of development. A study from Cincinnati Children's Hospital, using MRI scans of children aged three to five, found that higher screen use was associated with lower cortical thickness and reduced development in higher-order brain regions — the areas responsible for language, executive function, and attentional control. While basic visual processing areas showed accelerated maturation, the regions that support more complex cognitive skills lagged behind.
```

### 81. `bare-not-just-fragment`
- File: `fixtures/opus_4_6/social_anxiety_in_daily_life/article.md:21`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Social anxiety is not just feeling nervous before a presentation. It is a pattern that can infiltrate nearly every area of daily life, and it operates on three interconnected levels: body, mind, and behavior.
```

### 82. `bare-not-just-fragment`
- File: `fixtures/opus_4_6/why_couples_stop_communicating/article.md:11`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Modern life accelerates this drift. A 2025 study on technology and relationships found that while digital devices facilitate connection, they simultaneously foster emotional distance and miscommunication. Some participants described partners using phones and screens to avoid emotional engagement or escape difficult conversations entirely. The phone on the dinner table is not just a distraction; it can become a shield against vulnerability.
```

### 83. `bare-not-just-fragment`
- File: `fixtures/opus_4_6/stress_and_physical_symptoms/article.md:81`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Stress is not just in your head. It is in your racing heart, your aching muscles, your disrupted sleep, and your weakened immune system. The scientific evidence — from decades of physiological research to large-scale global surveys published as recently as 2025 — leaves no doubt that chronic psychological stress produces real, measurable, and sometimes dangerous physical consequences. The body keeps the score, as the saying goes. But it also responds to care. Regular exercise, mindful breathing, adequate sleep, good nutrition, and strong social bonds are not luxuries — they are essential tools for keeping stress from silently undermining your health. Recognizing the physical face of stress is the critical first step; acting on that knowledge is what makes the difference.
```

### 84. `single-node-or-fragment`
- File: `fixtures/opus_4_6/why_friendships_fade/article.md:37`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
A spouse or partner, no matter how loving, cannot fill every role.
```

- Review context:

```text
And beyond the clinical data, there is something harder to quantify — the loss of being truly known. A spouse or partner, no matter how loving, cannot fill every role. Friends offer a different mirror, one that reflects who you are outside of family obligations and professional identity. When friendships fade, a part of your self-understanding fades with them.
```

### 85. `bare-not-just-fragment`
- File: `fixtures/opus_4_6/why_people_lose_motivation_after_big_goals/article.md:23`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**Phase three is the fog.** Motivation is not just low; it feels absent. A 2025 study published in *Motivation and Emotion* tracked over 3,000 goals across multiple waves and found that stalled progress creates what researchers call an "action crisis" — a vicious cycle where low progress erodes your belief that the goal is attainable, which further reduces effort, which further stalls progress. The goal has not changed, but your relationship to it has. What was once a source of excitement is now a source of guilt.
```

### 86. `bare-not-just-fragment`
- File: `fixtures/opus_4_6/why_people_lose_motivation_after_big_goals/article.md:41`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
The research does not just explain why people quit. It also points clearly toward what helps them stay.
```

### 87. `same-prefix-pair`
- File: `fixtures/opus_4_6/why_people_lose_motivation_after_big_goals/article.md:45`
- Reason: truncated extraction
- Matched text:

```text
The point is not the distance. The point is that the identity of
```

- Review context:

```text
**Design for your worst day.** Most people plan their goals for their best selves — energized, focused, undistracted. The strategy that matters most is designing for the days when none of that is true. Decide in advance what the minimum viable action looks like. If your goal is to run every day, your minimum might be putting on your running shoes and walking to the end of the driveway. The point is not the distance. The point is that the identity of "someone who runs" survives even on a terrible day.
```

### 88. `single-node-or-fragment`
- File: `fixtures/opus_4_6/why_people_struggle_to_build_habits/article.md:31`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text

```

- Review context:

```text
"I want to eat healthier" is a wish, not a plan. Research by psychologist Peter Gollwitzer at New York University demonstrates that implementation intentions — pre-deciding the specific when, where, and how of a behavior — dramatically increase follow-through compared with vague goals. People who say "I will eat a salad at lunch in the office cafeteria on weekdays" succeed far more often than people who simply resolve to eat better.
```

### 89. `bare-not-just-fragment`
- File: `fixtures/opus_4_6/why_people_struggle_to_build_habits/article.md:57`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Katy Milkman, a behavioral scientist at the Wharton School and author of *How to Change*, developed the concept of temptation bundling — pairing a habit you need to do with something you enjoy. Listen to your favorite podcast only while exercising. Watch your guilty-pleasure show only while folding laundry. The immediate reward of the enjoyable activity compensates for the delayed reward of the beneficial one, solving the gratification gap that undermines so many habits.
### Shift your identity, not just your goals
Clear's most powerful insight is that lasting habits are rooted in identity rather than outcomes. Instead of "I want to lose 20 pounds" (outcome-based), try "I am someone who moves every day" (identity-based). Each small action becomes a vote for the person you are becoming. Over time, the accumulated evidence shifts your self-concept, and behavior follows identity with far less friction than it follows a goal.
```

### 90. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/how_burnout_develops_at_work/article.md:27`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**Physical signals** are often the first to emerge. Persistent fatigue that doesn't resolve after rest is the hallmark — not just tiredness, but a bone-deep exhaustion that sleep cannot replenish. This is frequently accompanied by sleep disruption, chronic headaches, digestive problems, and a weakened immune system that leaves people catching every cold that circulates through the office. The body is communicating what the mind may not yet have registered.
```

### 91. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/how_burnout_develops_at_work/article.md:63`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**Treat recovery as a skill, not a reward.** Research on high-performance athletes shows that deliberate recovery — not just passive rest — is what enables sustained output. This applies to knowledge workers too. Regular breaks, even micro-breaks of five to ten minutes, demonstrably reduce stress hormone levels. Scheduled recovery is not laziness; it is evidence-based performance maintenance.
```

### 92. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/screen_time_and_child_attention/article.md:73`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**Don't mistake the absence of screens for the goal.** The evidence consistently shows that the harms of screen time are largely harms of displacement. The question is not just how to limit screens but what to protect and cultivate instead: long blocks of unstructured play, physical activity, shared reading, conversation, and the ordinary, unhurried time in which children develop the capacity to be bored and to find their own way through it. Attention, it turns out, is not lost through screens alone — it is built, or not built, in all the time between them.
```

### 93. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/social_anxiety_in_daily_life/article.md:41`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Nearly a third of people with severe social anxiety also show symptoms consistent with PTSD, often rooted in prior social humiliation. The disorder is not just fear of the future — it is frequently the residue of painful experiences from the past.
```

### 94. `single-node-or-fragment`
- File: `fixtures/sonnet_4_6/stress_and_physical_symptoms/article.md:13`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
The parasympathetic
```

- Review context:

```text
The problem begins when the threat never goes away. Modern stressors — workplace pressure, financial strain, relationship conflict, global uncertainty — are rarely resolved by fighting or fleeing. When stress is chronic, the HPA axis never gets the all-clear signal. Cortisol levels stay elevated. The parasympathetic "rest and digest" system, which normally acts as a brake on the stress response, can't do its job. The body remains in a state of sustained physiological emergency — and over time, this takes a severe toll on nearly every system it was originally trying to protect.
```

### 95. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/stress_and_physical_symptoms/article.md:19`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**The heart and cardiovascular system.** Each stress response causes temporary spikes in heart rate and blood pressure. Occasionally, this is harmless. Repeatedly, over months and years, it damages the walls of blood vessels and arteries. The Mayo Clinic recognizes chronic stress as an independent risk factor for heart attack, stroke, and hypertension — not just a contributing lifestyle factor, but a direct physiological threat.
```

### 96. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/stress_and_physical_symptoms/article.md:49`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Stress is not just a feeling — it is a whole-body physiological event with measurable consequences for the heart, gut, immune system, skin, metabolism, and brain. Chronic stress is now recognized as a global health crisis, with real costs measured in disease burden, lost productivity, and shortened lives. But it is also responsive to intervention. Exercise, mindfulness, deep breathing, therapy, social support, and consistent sleep are not soft lifestyle suggestions — they are evidence-based tools that work at the biological level, directly counteracting the mechanisms through which stress causes physical harm.
```

### 97. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/why_couples_stop_communicating/article.md:67`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
But therapy is not the only path. A 2025 ten-year longitudinal study from the University of Zurich found that **dyadic coping** — how couples manage stress together, not just how they argue — was a stronger overall predictor of relationship satisfaction than communication skill alone. Couples who developed shared rituals for handling pressure, who treated stress as something to face together rather than separately, maintained their connection over time in ways that good-argument technique alone could not explain.
```

### 98. `single-node-or-fragment`
- File: `fixtures/sonnet_4_6/why_couples_stop_communicating/article.md:71`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
Using
```

- Review context:

```text
Practical habits also matter. Using "I" statements rather than "you" accusations, expressing appreciation regularly and specifically, calling for deliberate breaks when physiological arousal during conflict becomes too high — these are behavioral habits, not personality traits, and they can be learned at any point in a relationship's life.
```

### 99. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/why_friendships_fade/article.md:55`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**Respond to good news, not just bad.** Research on "capitalization" — actively, enthusiastically acknowledging a friend's positive events — shows it is one of the strongest predictors of friendship durability. Being there for the good moments matters as much as being there in crisis.
```

### 100. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/why_people_struggle_to_build_habits/article.md:13`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Dopamine plays a central role in this process. It is often described as the brain's "pleasure chemical," but a more accurate label is the "motivation and wanting" chemical. Dopamine fires in anticipation of a reward, not just upon receiving one, and it acts as a learning signal that tells the brain: *this behavior is worth repeating.* Research published in late 2025 identified a brain protein called KCC2 whose fluctuating levels regulate how strongly cues become linked with rewarding behaviors — explaining why some habits (and addictions) wire in with unusual speed while others resist formation despite consistent effort.
```

### 101. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/why_people_struggle_to_build_habits/article.md:33`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Identity is the other overlooked factor. A 2024 study in the *Journal of Personality and Social Psychology* found that framing habits in terms of identity — "I am someone who exercises" rather than "I want to lose weight" — produced meaningfully better long-term adherence. When a behavior is tied to who you are rather than what you want, skipping it feels like a violation of self, not just a missed goal. This is the core argument of James Clear's *Atomic Habits*, one of the best-selling books of the past decade: every vote you cast for a new behavior is a vote for a new identity, and identity-based habits are stickier because they are self-reinforcing.
```

### 102. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/why_people_struggle_to_build_habits/article.md:39`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
**Implementation intentions** are specific if-then plans that pre-load a decision: *"When I finish my morning coffee, I will do ten minutes of stretching."* A 2006 meta-analysis of 94 studies found a medium-to-large effect on goal attainment (d = 0.65). A landmark 2024 meta-analysis of 642 independent tests confirmed that implementation intentions reliably improve both behavior and habit automaticity, with effect sizes ranging from d = 0.27 to 0.66 across cognitive, affective, and behavioral outcomes. The mechanism is straightforward: vague intentions collapse under competing demands; specific trigger-based plans survive them. The key is the contingent format — *if/when* a specific situation arises, not just a general plan to act.
```

### 103. `bare-not-just-fragment`
- File: `fixtures/sonnet_4_6/why_people_wake_up_tired/article.md:112`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
Good sleep is not just a number of hours. It's a biological process that your body — and your daytime self — depends on getting right.
```

### 104. `bare-not-just-fragment`
- File: `fixtures/twitter/gpt_5_4/what-stress-does-to-the-body.md:1`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
1/10 Stress is not just a mood. It is a body-wide alarm system. Useful in a real emergency, expensive when it stays on all day.
```

### 105. `single-node-or-fragment`
- File: `fixtures/twitter/gpt_5_4/why-children-have-tantrums.md:19`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text
If a child is hurting themselves, cannot recover, or the outbursts are getting worse with age, get a pediatrician involved.
```

- Review context:

```text
10/10 Tantrums are common in toddlers. Daily, severe, or dangerous tantrums are different. If a child is hurting themselves, cannot recover, or the outbursts are getting worse with age, get a pediatrician involved. That is judgment, not failure.
```

### 106. `single-node-or-fragment`
- File: `fixtures/twitter/gpt_5_4/why-habits-fail-even-with-motivation.md:3`
- Reason: sentence extraction fragment or ordinary negation without a reframe
- Matched text:

```text

```

- Review context:

```text
2/10 A habit is a cue tied to a response, repeated enough times that the brain stops negotiating. If the cue is vague, the habit stays vague too. "I should work out more" is a wish, not a trigger.
```

### 107. `bare-not-just-fragment`
- File: `fixtures/twitter/gpt_5_4/why-habits-fail-even-with-motivation.md:7`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
4/10 Size matters more than people want to admit. If your new habit feels like hauling furniture, repetition dies fast. A habit needs to be small enough to survive a bad Tuesday, not just a perfect Monday.
```

### 108. `bare-not-just-fragment`
- File: `fixtures/twitter/gpt_5_4/why-loneliness-affects-mental-and-physical-health.md:1`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
1/10 Loneliness is not just a sad mood. It is a stress state. You can feel it in a crowded office, at a family dinner, or in a group chat that somehow makes you feel more alone.
```

### 109. `bare-not-just-fragment`
- File: `fixtures/twitter/gpt_5_4_mini/what-stress-does-to-the-body.md:1`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
1/10 Stress is not just a feeling. It is the body’s alarm system, and it changes how you sleep, think, digest, and recover.
```

### 110. `bare-not-just-fragment`
- File: `fixtures/twitter/gpt_5_4_mini/why-adults-procrastinate-and-what-helps.md:11`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
6/10 The environment matters too. Phones, tabs, notifications, and easy internet rewards all make delay more attractive. Procrastination is not just a mindset problem. It is often a design problem.
```

### 111. `bare-not-just-fragment`
- File: `fixtures/twitter/gpt_5_4_mini/why-loneliness-affects-mental-and-physical-health.md:1`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
1/10 Loneliness is not just feeling sad in a quieter room. It is what happens when your need for connection is not being met.
```

### 112. `bare-not-just-fragment`
- File: `fixtures/twitter/gpt_5_4_mini/why-people-wake-up-tired-even-after-enough-sleep.md:5`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
2/10
The body cares about sleep quality, not just the clock on the wall. Waking often, snoring, or gasping can leave you tired even when bedtime looks “normal.”
```

### 113. `bare-not-just-fragment`
- File: `fixtures/twitter/gpt_5_4_mini/why-social-media-affects-attention-span.md:9`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
5/10 The real problem is not just the app. It is the habit of keeping a feed open while doing something else.
```

### 114. `bare-not-just-fragment`
- File: `fixtures/why_do_we_dream.md:27`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
In my previous sections, I described the different stages of sleep, and the vital role played by REM sleep in generating dreams. But what happens inside our brains during this stage? Well, the key brain circuits responsible for producing REM sleep are located in the brainstem. These circuits send signals to different regions of the brain, including the visual and emotional centers, which are responsible for generating dream content. However, the dream-stoking circuitry also paralyzes our muscles during REM sleep so that our brain can simulate a visual experience without moving the body. Disruption of these pathways can result in various sleep disorders like sleepwalking and rapid eye movement behavior disorder. But, it’s not just the brainstem that’s involved in dream sleep. I believe that various other neural circuits, including the limbic system, become co-activated during REM sleep. Therefore, understanding the brain circuits involved in REM sleep is crucial in unraveling the mystery of why we dream when we sleep.
```

### 115. `bare-not-just-fragment`
- File: `fixtures/why_do_we_dream.md:31`
- Reason: bare `not just` is not enough evidence; match must include the full contrast or move to another rule
- Matched text:

```text
not just
```

- Review context:

```text
As we delve deeper into the topic of dreaming during sleep, it’s essential to understand the purpose behind it. Dreams are not just incidental brain activity with no essential purpose or meaning; they serve a critical function in the brain. During REM sleep, dreams help consolidate and integrate memories made during the day, enabling the brain to form long-term memories more efficiently. Furthermore, dreaming allows the brain to process and make sense of emotional experiences that we face in our daily lives. Dreams can also aid in problem-solving and creativity by providing us with novel solutions to issues that we may face. Ultimately, the purpose of dream sleep is to facilitate comprehensive and efficient cognitive processing and enhance our mental and emotional functioning.
```

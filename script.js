function initSsbaQuiz() {
  const form = document.getElementById("ssba-form");
  const feedback = document.getElementById("quiz-feedback");

  if (!form || !feedback) return;

  function setFeedback(score, total, unanswered) {
    const percent = total ? Math.round((score / total) * 100) : 0;

    let bandMessage = "";

    if (score >= 18) {
      bandMessage = "That is an excellent score.";
      feedback.style.color = "#166534";
    } else if (score >= 13) {
      bandMessage = "This is a good score.";
      feedback.style.color = "#92400e";
    } else {
      bandMessage = "This score may need work — refer to the Resources below or you can retry the test.";
      feedback.style.color = "#991b1b";
    }

    feedback.textContent = `Score: ${score}/${total} (${percent}%). ${bandMessage}${unanswered ? ` Unanswered: ${unanswered}.` : ""}`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const explanations = [
      "Functional neurological disorder causes genuine symptoms that are inconsistent with recognised neurological disease and may fluctuate or improve with distraction; imaging is often normal.",
      "In acute agitation, use rapid tranquillisation after de-escalation and risk assessment; IM benzodiazepines such as lorazepam act quickly. Depot and oral options are not appropriate for immediate control.",
      "SSRI use in the third trimester is associated with an increased risk of persistent pulmonary hypertension of the newborn (PPHN). Congenital malformations are more associated with first-trimester exposure (notably paroxetine).",
      "This is likely sundowning. First-line management is behavioural/environmental measures and sleep–wake routine optimisation; antipsychotics are reserved for severe distress or significant risk.",
      "De Clerambault’s syndrome (erotomania) is a delusional disorder where the patient believes someone (often famous/higher status) is in love with them, with an otherwise largely normal mental state.",
      "Circumstantiality is over-inclusive, excessively detailed speech that eventually returns to the point (unlike tangentiality, which never gets to the point).",
      "Fever/sore throat on clozapine is agranulocytosis until proven otherwise: stop clozapine immediately and urgently check full blood count/neutrophils.",
      "OCD presents with ego-dystonic intrusive thoughts, preserved insight (" +
        "\"I know it’s irrational\"" +
        "), and compulsions/neutralising behaviours (e.g., repeated checking).",
      "QRS widening suggests sodium channel blockade (classically TCA overdose). Immediate treatment is IV sodium bicarbonate; flumazenil is unsafe if seizures or mixed overdose are possible.",
      "MAOIs (e.g., phenelzine) plus tyramine can precipitate a hypertensive crisis: severe headache, diaphoresis/palpitations, and markedly elevated blood pressure.",
      "Delirium tremens typically occurs 48–96 hours after alcohol reduction/cessation and features agitation, confusion, autonomic instability, tremor, and vivid visual hallucinations (often insects/animals).",
      "The picture fits schizophrenia: >6 months of gradual onset psychotic symptoms with functional decline (third-person auditory hallucinations, delusions of reference/persecution, thought disorder).",
      "Catatonia features immobility, posturing, negativism/rigidity, and echophenomena (e.g., echolalia). It is distinct from NMS, which includes hyperthermia and autonomic instability after dopamine antagonists.",
      "Coarse tremor, ataxia, slurred speech, and confusion after a dose increase strongly suggest lithium toxicity. This is a medical emergency requiring urgent hospital assessment and lithium level/bloods.",
      "Acute dystonia occurs hours–days after starting/increasing antipsychotics and causes sudden painful muscle contractions (e.g., torticollis, oculogyric crisis, jaw clenching).",
      "Cyclothymia is a chronic (≥2 years) fluctuating mood disturbance with hypomanic and depressive symptoms that do not meet full criteria for hypomania/mania or major depression.",
      "Confusion + ataxia + nystagmus/ophthalmoplegia suggests Wernicke’s encephalopathy. Treat immediately with IV thiamine (and give thiamine before glucose if needed).",
      "Serotonin syndrome develops rapidly (often within hours) and causes agitation, autonomic instability, hyperreflexia, clonus, and hyperactive bowel sounds (especially with serotonergic combinations like antidepressants + tramadol).",
      "Generalised anxiety disorder is excessive, difficult-to-control worry about multiple domains for months with associated symptoms such as restlessness, poor sleep, and muscle tension.",
      "Acute onset confusion, inattention, disorientation, and fluctuating course (often with an underlying infection) is delirium until proven otherwise."
    ];

    const fieldsets = Array.from(form.querySelectorAll("fieldset[data-answer]"));
    const total = fieldsets.length;
    let score = 0;
    let unanswered = 0;

    fieldsets.forEach((fieldset, index) => {
      fieldset.classList.remove("is-correct", "is-incorrect", "is-unanswered");

      const labels = Array.from(fieldset.querySelectorAll("label"));
      labels.forEach((label) => {
        label.classList.remove("is-correct-choice", "is-selected-wrong", "is-selected-right");
      });

      const correct = fieldset.dataset.answer;
      const selected = fieldset.querySelector("input[type='radio']:checked");

      const correctInput = fieldset.querySelector(`input[type='radio'][value='${correct}']`);
      const correctLabel = correctInput ? correctInput.closest("label") : null;
      const correctText = correctLabel ? correctLabel.textContent.trim() : "";

      if (correctLabel) {
        correctLabel.classList.add("is-correct-choice");
      }

      let resultEl = fieldset.querySelector(".ssba-result");
      if (!resultEl) {
        resultEl = document.createElement("p");
        resultEl.className = "ssba-result";
        fieldset.appendChild(resultEl);
      }

      let explanationEl = fieldset.querySelector(".ssba-explanation");
      if (!explanationEl) {
        explanationEl = document.createElement("div");
        explanationEl.className = "ssba-explanation";
        fieldset.appendChild(explanationEl);
      }

      explanationEl.textContent = explanations[index] || "";

      if (!selected) {
        unanswered += 1;
        fieldset.classList.add("is-unanswered");
        resultEl.textContent = correctText ? `Unanswered. Correct answer: ${correctText}` : "Unanswered.";
        resultEl.style.color = "#92400e";
        explanationEl.hidden = false;
        return;
      }

      const selectedLabel = selected.closest("label");

      if (selected.value === correct) {
        score += 1;
        fieldset.classList.add("is-correct");
        if (selectedLabel) selectedLabel.classList.add("is-selected-right");
        resultEl.textContent = "Correct.";
        resultEl.style.color = "#166534";
      } else {
        fieldset.classList.add("is-incorrect");
        if (selectedLabel) selectedLabel.classList.add("is-selected-wrong");
        resultEl.textContent = correctText ? `Incorrect. Correct answer: ${correctText}` : "Incorrect.";
        resultEl.style.color = "#991b1b";
      }

      explanationEl.hidden = false;
    });

    setFeedback(score, total, unanswered);
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

initSsbaQuiz();

function initTopNavActive() {
  const links = Array.from(document.querySelectorAll(".top-nav a, .nav-menu a"));
  if (!links.length) return;

  function sync() {
    const rawHash = window.location.hash;
    const hash = rawHash && rawHash.length ? rawHash : "#top";
    links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === hash));
  }

  window.addEventListener("hashchange", sync);
  sync();
}

initTopNavActive();
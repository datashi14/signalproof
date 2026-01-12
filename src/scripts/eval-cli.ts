import { runEvaluation } from '../lib/eval/harness';

async function main() {
  try {
    const results = await runEvaluation();
    process.exit(0);
  } catch (err) {
    console.error("Evaluation failed:", err);
    process.exit(1);
  }
}

main();

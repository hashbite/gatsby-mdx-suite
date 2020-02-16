output=$(yarn --silent run lerna changed --json | jq '[.[] | "- [`\(.name)`](\(.location)): v\(.version)"] | join("\\\\n") | @sh "::set-output name=lerna_bumps::\(.)"' --raw-output);
echo "::warning::$output";
echo "$output";

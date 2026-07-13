import os

root_dir = r"d:\Fifa Challenge"
target_dirs = ["app", "components", "lib"]

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content.replace("Aegis", "PitchControl")
        new_content = new_content.replace("aegis", "pitchcontrol")
        new_content = new_content.replace("AEGIS", "PITCHCONTROL")
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

for d in target_dirs:
    for dirpath, dirnames, filenames in os.walk(os.path.join(root_dir, d)):
        for filename in filenames:
            if filename.endswith(('.ts', '.tsx', '.md', '.json', '.js', '.css', '.html')):
                replace_in_file(os.path.join(dirpath, filename))

# Rename files and directories
comp_old = os.path.join(root_dir, "components", "aegis")
comp_new = os.path.join(root_dir, "components", "pitchcontrol")
if os.path.exists(comp_old):
    os.rename(comp_old, comp_new)

lib_old = os.path.join(root_dir, "lib", "aegis.ts")
lib_new = os.path.join(root_dir, "lib", "pitchcontrol.ts")
if os.path.exists(lib_old):
    os.rename(lib_old, lib_new)

# also replace in FLOW.md and QA_Test_Report.md
replace_in_file(os.path.join(root_dir, "FLOW.md"))
qa_file = os.path.join(root_dir, "QA_Test_Report.md")
if os.path.exists(qa_file):
    replace_in_file(qa_file)

print("Replacement complete.")

import { FormField } from "./form-field"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckboxOption } from "@/components/ui/checkbox"
import { companyTypeOptions, monthlyLeadVolumeOptions, deadLeadDatabaseOptions, leadSourceOptions } from "@/data/pilot"
import type { PilotFormState } from "@/lib/pilot-schema"

export interface StepProps {
  values: PilotFormState
  errors: Partial<Record<keyof PilotFormState, string>>
  onChange: (patch: Partial<PilotFormState>) => void
}

export function Step1Company({ values, errors, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      <FormField id="name" label="Name" required error={errors.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => onChange({ name: e.target.value })}
          aria-describedby={errors.name ? "name-error" : undefined}
          invalid={!!errors.name}
        />
      </FormField>

      <FormField id="company" label="Company" required error={errors.company}>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => onChange({ company: e.target.value })}
          aria-describedby={errors.company ? "company-error" : undefined}
          invalid={!!errors.company}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField id="role" label="Role" required error={errors.role}>
          <Input
            id="role"
            name="role"
            autoComplete="organization-title"
            placeholder="e.g. VP Sales"
            value={values.role}
            onChange={(e) => onChange({ role: e.target.value })}
            aria-describedby={errors.role ? "role-error" : undefined}
            invalid={!!errors.role}
          />
        </FormField>

        <FormField id="city" label="City" error={errors.city}>
          <Input
            id="city"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => onChange({ city: e.target.value })}
            aria-describedby={errors.city ? "city-error" : undefined}
            invalid={!!errors.city}
          />
        </FormField>
      </div>

      <FormField id="companyType" label="Company type" required error={errors.companyType}>
        <Select
          id="companyType"
          name="companyType"
          value={values.companyType ?? ""}
          onChange={(e) => onChange({ companyType: e.target.value as PilotFormState["companyType"] })}
          aria-describedby={errors.companyType ? "companyType-error" : undefined}
          invalid={!!errors.companyType}
        >
          <option value="" disabled>
            Select one
          </option>
          {companyTypeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </FormField>
    </div>
  )
}

export function Step2Pipeline({ values, errors, onChange }: StepProps) {
  const toggleSource = (source: string) => {
    const has = values.leadSources.includes(source)
    onChange({
      leadSources: has ? values.leadSources.filter((s) => s !== source) : [...values.leadSources, source],
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField id="monthlyLeadVolume" label="Approximate monthly lead volume" required error={errors.monthlyLeadVolume}>
          <Select
            id="monthlyLeadVolume"
            name="monthlyLeadVolume"
            value={values.monthlyLeadVolume ?? ""}
            onChange={(e) => onChange({ monthlyLeadVolume: e.target.value as PilotFormState["monthlyLeadVolume"] })}
            aria-describedby={errors.monthlyLeadVolume ? "monthlyLeadVolume-error" : undefined}
            invalid={!!errors.monthlyLeadVolume}
          >
            <option value="" disabled>
              Select a range
            </option>
            {monthlyLeadVolumeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField id="deadLeadDatabase" label="Approximate old / unresponsive lead database" required error={errors.deadLeadDatabase}>
          <Select
            id="deadLeadDatabase"
            name="deadLeadDatabase"
            value={values.deadLeadDatabase ?? ""}
            onChange={(e) => onChange({ deadLeadDatabase: e.target.value as PilotFormState["deadLeadDatabase"] })}
            aria-describedby={errors.deadLeadDatabase ? "deadLeadDatabase-error" : undefined}
            invalid={!!errors.deadLeadDatabase}
          >
            <option value="" disabled>
              Select a range
            </option>
            {deadLeadDatabaseOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-foreground mb-1.5">
          Lead sources <span className="font-normal text-muted-foreground">(optional)</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {leadSourceOptions.map((source) => (
            <CheckboxOption
              key={source}
              label={source}
              checked={values.leadSources.includes(source)}
              onChange={() => toggleSource(source)}
            />
          ))}
        </div>
      </fieldset>

      <FormField id="currentCrm" label="Current CRM" error={errors.currentCrm} hint="Informational only — this doesn't imply integration support today.">
        <Input
          id="currentCrm"
          name="currentCrm"
          autoComplete="off"
          placeholder="Sell.Do, Kylas, Salesforce, spreadsheet, etc."
          value={values.currentCrm}
          onChange={(e) => onChange({ currentCrm: e.target.value })}
          aria-describedby={errors.currentCrm ? "currentCrm-error" : "currentCrm-hint"}
          invalid={!!errors.currentCrm}
        />
      </FormField>
    </div>
  )
}

export function Step3Contact({ values, errors, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      <FormField id="workEmail" label="Work email" required error={errors.workEmail}>
        <Input
          id="workEmail"
          name="workEmail"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.workEmail}
          onChange={(e) => onChange({ workEmail: e.target.value })}
          aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
          invalid={!!errors.workEmail}
        />
      </FormField>

      <FormField id="phone" label="Phone / WhatsApp" required error={errors.phone} hint="Your own business number — not your customers'.">
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={values.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          invalid={!!errors.phone}
        />
      </FormField>

      <FormField id="note" label="Anything we should know about your current follow-up process?" error={errors.note}>
        <Textarea
          id="note"
          name="note"
          maxLength={1000}
          value={values.note}
          onChange={(e) => onChange({ note: e.target.value })}
          aria-describedby={errors.note ? "note-error" : undefined}
          invalid={!!errors.note}
        />
      </FormField>
    </div>
  )
}
